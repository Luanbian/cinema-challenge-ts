import logger from '../logger'
import { type types, type Ilogs } from '../protocol/pino.adapter.protocol'

export class PinoAdapter implements Ilogs {
  public async execute (type: types, msg: string): Promise<void> {
    logger[type]({ msg })
  }
}
