// export default () => {
//   jest.mock('../../src/services/tasks', () => ({
//     publish: jest.fn(),
//   }))
//   jest.mock('../../src/services/storage', () => ({
//     uploadFile: jest.fn(),
//     downloadFile: jest.fn(),
//     getBucketName: jest.fn(),
//   }))
//   jest.mock('../../src/services/pubsub/publisher', () => ({
//     publishMessage: jest.fn(),
//   }))
//   jest.mock('../../src/services/sentry', () => ({
//     reportException: jest.fn(),
//     reportInfo: jest.fn(),
//   }))
//   jest.mock('../../src/services/amqp', () => ({
//     publishWorker: jest.fn(),
//   }))
// }
