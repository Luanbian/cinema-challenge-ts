import { type Ilogs } from '../protocol/log.adapter.protocol'
import { LogAdapter } from './log.adapter'
import logger from '../logger'

jest.mock('winston', () => ({
  createLogger: jest.fn(() => ({
    log: jest.fn()
  })),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    prettyPrint: jest.fn(),
    printf: jest.fn()
  },
  transports: {
    File: jest.fn()
  }
}))

const makeSut = (): Ilogs => {
  return new LogAdapter()
}

describe('LogAdapter', () => {
  test('should call logger.log with minimum values', async () => {
    const sut = makeSut()
    const logSpy = jest.spyOn(logger, 'log')
    await sut.execute('info', 'test')
    expect(logSpy).toHaveBeenCalledWith({ level: 'info', message: 'test' })
  })
  test('should call logger.log with minimum values and label', async () => {
    const sut = makeSut()
    const logSpy = jest.spyOn(logger, 'log')
    await sut.execute('info', 'test', { label: 'test' })
    await sut.execute('info', 'test', true)
    await sut.execute('info', 'test', 'any_label_format')
    expect(logSpy).toHaveBeenCalledWith({ level: 'info', message: 'test', label: { label: 'test' } })
    expect(logSpy).toHaveBeenCalledWith({ level: 'info', message: 'test', label: true })
    expect(logSpy).toHaveBeenCalledWith({ level: 'info', message: 'test', label: 'any_label_format' })
  })
  test('should call logger.log with maximum values', async () => {
    const sut = makeSut()
    const logSpy = jest.spyOn(logger, 'log')
    const error = new Error('error')
    await sut.execute('info', 'test', { label: 'test' }, error)
    expect(logSpy).toHaveBeenCalledWith({ level: 'info', message: 'test', label: { label: 'test' }, error })
  })
})
