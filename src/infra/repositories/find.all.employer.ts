import { type Employers } from '@prisma/client'
import prisma from '../prisma'
import { type IfindAllEmployers } from '../protocols/find.all.employers.protocols'

export class FindAllEmployer implements IfindAllEmployers {
  public async findAll (): Promise<{
    result: Employers[]
    length: number
  }> {
    const result: Employers[] = await prisma.employers.findMany()
    const length = result.length

    return { result, length }
  }
}
