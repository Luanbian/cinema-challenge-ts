import { type MovieProps } from '../../domain/entities/movie'
import prisma from '../prisma'

export class SaveMovie {
  public async save (data: MovieProps): Promise<void> {
    await prisma.movies.create({ data })
  }
}
