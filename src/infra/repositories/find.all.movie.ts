import { type Movies } from '@prisma/client'
import prisma from '../prisma'

interface queryProps {
  column: string
  type: string
  limit: string
  page: string
}

export class FindAllMovie {
  public async findAll ({ column, type, limit, page }: queryProps): Promise<Movies[]> {
    const result: Movies[] = await prisma.$queryRawUnsafe(`
      select * from movies
      order by ${column} ${type}
      limit ${limit} offset ${page};
    `)
    return result
  }
}
