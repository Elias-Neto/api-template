import 'express-async-errors'
import bodyParser from 'body-parser'
import { isCelebrateError } from 'celebrate'
import EscapeHtml from 'escape-html'
import express, { NextFunction, Request, Response, Router } from 'express'
import { MongoOptions } from 'mongodb'

import { AppError } from '@services/errors/AppError'
import { connect } from '@services/mongo'

import config from '../../../src/config'
import { extractPersonInformation } from '../../../src/middlewares/person-information'

const server = async (routes: Router) => {
  const app = express()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = config.mongo.options as any as MongoOptions
  const { host } = config.mongo
  app.locals.mongo = await connect({ host, options })

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use([extractPersonInformation({ isTest: true })])

  app.use('/', routes)

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
          keys: joiError.details.map(detail =>
            EscapeHtml(detail.path.join('.')),
          ),
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

    return res.status(500).json({ message: 'internal server error' })
  })

  return app
}

export { server }
