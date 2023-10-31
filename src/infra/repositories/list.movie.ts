import { type Movies } from '@prisma/client'
import prisma from '../prisma'

export class ListMovie {
  public async list (): Promise<Movies[]> {
    const result = await prisma.movies.findMany()
    return result
  }
}
