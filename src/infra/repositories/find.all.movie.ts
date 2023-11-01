import { type Movies } from '@prisma/client'
import prisma from '../prisma'

export class FindAllMovie {
  public async findAll ({ column, type }: { column: string, type: string }): Promise<Movies[]> {
    const result: Movies[] = await prisma.$queryRawUnsafe(`
      select * from movies
      order by ${column} ${type};
    `)
    return result
  }
}
