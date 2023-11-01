import { type Movie } from '../../domain/entities/movie'
import prisma from '../prisma'
import { type IsaveMovies } from '../protocols/save.movies.protocols'

export class SaveMovie implements IsaveMovies {
  public async save (data: Movie): Promise<void> {
    await prisma.movies.createMany({ data: [data] })
  }
}
