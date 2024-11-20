import 'express-async-errors'
import bodyParser from 'body-parser'
import { isCelebrateError } from 'celebrate'
import cors from 'cors'
import EscapeHtml from 'escape-html'
import express, { NextFunction, Request, Response } from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'

import { AppError } from '@services/errors/AppError'

import apiRouter from './api/index'
import { extractPersonInformation } from './middlewares/person-information'
import { HeaderNames } from './types/global.enums'

const app = express()

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false, limit: '4mb' }))
app.use(bodyParser.json({ limit: '2mb' }))
app.use(logger('dev'))

app.use(
  cors({
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: [
      HeaderNames.ContentType,
      HeaderNames.Authorization,
      HeaderNames.ApigatewayApiUserinfo,
    ],
    exposedHeaders: [HeaderNames.Count, HeaderNames.ContentDisposition],
  }),
)

app.use([extractPersonInformation])

const API_VERSION = process.env.API_VERSION || '/'

app.use(API_VERSION, apiRouter)

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// capture Not Found - 404
app.use((req: Request, res: Response, next: NextFunction) => {
  // Return 'Forbidden' error when resource is not found
  const err = new AppError('Forbidden', null, 403)
  next(err)
})

// capture exception
app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    // eslint-disable-next-line no-console
    console.log(err.error)
    return res.status(err.status).json({ message: err.message })
  }

  if (isCelebrateError(err)) {
    const validation = {}
    for (const [segment, joiError] of err.details.entries()) {
      validation[segment] = {
        source: segment,
        keys: joiError.details.map(detail => EscapeHtml(detail.path.join('.'))),
        message: joiError.message,
      }
    }

    const status = 400
    const result = {
      message: err.message,
      validation,
      status,
    }

    return res.status(status).json(result)
  }

  return res.status(500).json({
    message: 'internal server error',
  })
})

export default app
