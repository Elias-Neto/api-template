import { readdirSync, readFileSync } from 'fs'
import { MongoOptions, ObjectId } from 'mongodb'
import { join } from 'path'

import config from '../../src/config'
import { connect } from '../../src/services/mongo/index'

const listMockCollectionNames = (
  filterCollections: string[],
  seeder = 'default',
) => {
  const collectionNames = []

  const directoryPath = join(process.cwd(), 'test', 'seeders', seeder)
  const files = readdirSync(directoryPath, {
    encoding: 'utf-8',
    withFileTypes: true,
  })

  files.forEach(file => {
    if (!file.isDirectory()) {
      const collectionName = file.name.replace('.json', '')
      if (filterCollections.includes(collectionName)) {
        collectionNames.push(collectionName)
      }
    }
  })

  return collectionNames
}

// creates connection
const connection = async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const options = config.mongo.options as any as MongoOptions
  const { host } = config.mongo
  return connect({ host, options })
}

// create test database
const insertMockData = async (
  filterCollections: string[],
  database = config.mongo.mockDatabase,
  seeder = 'default',
) => {
  const collectionNames = listMockCollectionNames(filterCollections, seeder)
  const mongoConnection = await connection()
  const db = mongoConnection.db(database)

  // create collections
  for await (const collectionName of collectionNames) {
    const filePath = join(
      process.cwd(),
      'test',
      'seeders',
      seeder,
      `${collectionName}.json`,
    )
    const file = readFileSync(filePath, { encoding: 'utf-8' })
    const fileParsed = JSON.parse(file)

    try {
      const seed = fileParsed.map(c => ({
        ...c,
        _id: new ObjectId(c._id),
      }))
      await db.collection(collectionName).insertMany(seed)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(`Deu ruim!`, e)
    }
  }
}

// drop test database
const dropMockData = async (
  collections: string[],
  database = config.mongo.mockDatabase,
  seeder = 'default',
) => {
  const collectionNames = listMockCollectionNames(collections, seeder)
  const mongoConnection = await connection()
  const db = mongoConnection.db(database)

  for await (const collectionName of collectionNames) {
    await db.collection(collectionName).drop()
  }
}

export { insertMockData, dropMockData }
