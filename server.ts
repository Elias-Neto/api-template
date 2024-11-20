import { MongoOptions } from 'mongodb'

import app from './src/app'
import config from './src/config'
import { connect } from './src/services/mongo/index'

setImmediate(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = config.mongo.options as any as MongoOptions
  const { host } = config.mongo
  const db = await connect({ host, options })
  app.locals.mongo = db

  const message = `[CatalogoOnline] Enterprise API initialized at port ${config.port}`
  /* eslint no-console: "off" */
  app.listen(config.port, () => console.log(message))
})
