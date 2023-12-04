export interface Ilogs {
  execute: (type: types, msg: string) => Promise<void>
}

export type types = 'debug' | 'info' | 'warn' | 'error' | 'fatal'
