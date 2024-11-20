import { NextFunction, Request, Response } from 'express'
import { MongoClient } from 'mongodb'

import config from '../config'

const extractPersonInformation =
  ({ isTest = false }) =>
  async (request: Request, _: Response, next: NextFunction) => {
    const client: MongoClient = request.app.locals.mongo
    request.client = client

    const tenantID = isTest ? config.mongo.mockDatabase : 'catalogo-online'
    const db = client.db(tenantID)
    request.db = db

    request.locals = {} // localstorage

    return next()
  }

export { extractPersonInformation }
