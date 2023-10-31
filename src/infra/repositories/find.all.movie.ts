import { type Movies } from '@prisma/client'
import prisma from '../prisma'

export class FindAllMovie {
  public async findAll (order: 'asc' | 'desc'): Promise<Movies[]> {
    const result = await prisma.movies.findMany({
      orderBy: {
        name: order
      }
    })
    return result
  }
}
