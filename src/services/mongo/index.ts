import { MongoClient, MongoOptions } from 'mongodb'

const connect = async ({
  host,
  options,
}: {
  host: string
  options: MongoOptions
}): Promise<MongoClient> => {
  try {
    return await MongoClient.connect(host, options)
  } catch (error) {
    /* eslint no-console: "off" */
    console.error(`Failed to connect to the database. ${error.stack}`)
    throw error
  }
}

export { connect }
