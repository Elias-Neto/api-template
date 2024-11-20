import { Express } from 'express'
import request from 'supertest'

import { dropMockData, insertMockData } from '../../../test/utils'
import { server } from '../../../test/utils/express/express'
import { CollectionNames } from '../../types/global.enums'
import router from '../index'

let app: Express

const collections = [CollectionNames.Examples]

beforeAll(async () => {
  // eslint-disable-next-line no-console
  console.log('[examples.router] insert mock')
  app = await server(router)
  await insertMockData(collections)
})

afterAll(async () => {
  // eslint-disable-next-line no-console
  console.log('[examples.router] drop mock')
  await app.locals.mongo.close(true)
  await dropMockData(collections)
})

describe('[GET] /examples', () => {
  it('should return 200', async () => {
    const response = await request(app).get('/examples')
    expect(response.status).toBe(200)
  })
})
