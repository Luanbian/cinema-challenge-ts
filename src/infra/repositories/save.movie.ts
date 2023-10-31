import { type newMovie } from '../../data/usecases/create.movie'
import prisma from '../prisma'

export class SaveMovie {
  public async save (data: newMovie): Promise<void> {
    await prisma.movies.create({ data })
  }
}
