import { type Movies } from '@prisma/client'
import prisma from '../prisma'

interface queryProps {
  column: string
  type: string
  limit: string
  page: string
}

export class FindAllMovie {
  public async findAll ({ column, type, limit, page }: queryProps): Promise<{
    result: Movies[]
    length: number
    hasMore: boolean
  }> {
    const offset = (Number(page) - 1) * Number(limit)
    const result: Movies[] = await prisma.$queryRawUnsafe(`
      select * from movies
      order by ${column} ${type}
      limit ${limit} offset ${offset};
    `)
    const length = await this.getLength()
    const hasMore = length > Number(page) * Number(limit)
    return { result, length, hasMore }
  }

  private async getLength (): Promise<number> {
    const consult = await prisma.movies.findMany()
    return consult.length
  }
}
