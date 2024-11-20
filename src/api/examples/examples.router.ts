import { Router } from 'express'

import { fetchExamples } from './examples.controller'

const router: Router = Router()

router.get('/', [fetchExamples])

export default router
