import { type Employers } from '@prisma/client'
import prisma from '../prisma'

export class FindAllEmployer {
  public async findAll (): Promise<{
    result: Employers[]
    length: number
  }> {
    const result: Employers[] = await prisma.employers.findMany()
    const length = result.length

    return { result, length }
  }
}
