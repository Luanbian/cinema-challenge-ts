import logger from '../logger'
import { type types, type Ilogs } from '../protocol/log.adapter.protocol'

export class LogAdapter implements Ilogs {
  public async execute (type: types, msg: string): Promise<void> {
    logger[type]({ msg })
  }
}
