import { config } from 'dotenv'

config()

export default {
  env: process.env.ENV || 'sandbox',
  port: process.env.PORT || 5000,
  mongo: {
    host: process.env.MONGODB_HOST || 'mongodb://localhost:27017',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    mockDatabase: process.env.MOCK_DATABASE || 'catalogo-online-test-backend',
  },
}
