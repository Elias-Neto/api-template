import { EventEmitter } from 'events'

// import stubs from './stubs/index'

EventEmitter.defaultMaxListeners = Infinity
global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat

// eslint-disable-next-line no-console
// console.log('[setup] creating stubs')
// stubs()

// // eslint-disable-next-line no-console
// console.log('[setup] setting timeout')
// jest.setTimeout(70000)
