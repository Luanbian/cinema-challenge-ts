import logger from '../logger'
import { type types, type Ilogs, type IlogObject } from '../protocol/log.adapter.protocol'

export class LogAdapter implements Ilogs {
  public async execute (type: types, msg: string, label?: any, error?: Error): Promise<void> {
    const logObject: IlogObject = {
      level: type,
      message: msg,
      label,
      error
    }
    logger.log(logObject)
  }
}
