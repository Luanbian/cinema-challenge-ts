import { type Movies } from '@prisma/client'
import prisma from '../prisma'

export class FindAllMovie {
  public async findAll (): Promise<Movies[]> {
    const result = await prisma.movies.findMany()
    return result
  }
}
