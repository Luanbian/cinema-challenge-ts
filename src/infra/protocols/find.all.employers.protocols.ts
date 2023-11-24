import { type Employers } from '@prisma/client'

export interface IfindAllEmployers {
  findAll: () => Promise<{
    result: Employers[]
    length: number
  }>
}
