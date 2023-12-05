export interface Ilogs {
  execute: (type: types, msg: string, label?: any, error?: Error) => Promise<void>
}

export interface IlogObject {
  level: string
  message: string
  label?: any
  error?: Error
}

export type types = 'debug' | 'info' | 'warning' | 'error' | 'crit'
