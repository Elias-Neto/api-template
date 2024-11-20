import { Router } from 'express'

import examplesRouter from './examples/examples.router'

const router = Router()

router.get('/status', (_, res) =>
  res.json({ message: '[CatalogoOnline] Enterprise API is up and running :)' }),
)

router.use('/examples', examplesRouter)

export default router
