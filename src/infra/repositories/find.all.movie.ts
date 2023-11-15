import { type Movies } from '@prisma/client'
import prisma from '../prisma'
import { type queryProps } from '../protocols/find.all.movies.protocols'

export class FindAllMovie {
  public async findAll ({ column, type, limit, page }: queryProps): Promise<{
    result: Movies[]
    length: number
    hasMore: boolean
  }> {
    const offset = (Number(page) - 1) * Number(limit)
    const result: Movies[] = await prisma.movies.findMany({
      orderBy: [{ [column]: type }],
      take: Number(limit),
      skip: offset
    })

    const length = await this.getLength()
    const hasMore = length > Number(page) * Number(limit)
    return { result, length, hasMore }
  }

  private async getLength (): Promise<number> {
    const consult = await prisma.movies.findMany()
    return consult.length
  }
}
