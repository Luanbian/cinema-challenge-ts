import { type Movie } from '../../domain/entities/movie'
import prisma from '../prisma'

export class SaveMovie {
  public async save (data: Movie): Promise<void> {
    await prisma.movies.createMany({ data: [data] })
  }
}
