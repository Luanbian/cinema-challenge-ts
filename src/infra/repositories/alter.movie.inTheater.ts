import prisma from '../prisma'
import { type after, type IalterMovieInTheater } from '../protocols/alter.movie.inTheater.protocol'

export class AlterMovieInTheater implements IalterMovieInTheater {
  public async alter (id: string): Promise<after | null> {
    const consult = await this.consult(id)
    if (consult === null) return null
    const update = await prisma.movies.update({
      where: {
        id
      },
      data: {
        inTheaters: !consult
      }
    })
    return { action: 'updated', after: update }
  }

  private async consult (id: string): Promise<boolean | null> {
    const result = await prisma.movies.findFirst({
      select: {
        inTheaters: true
      },
      where: {
        id
      }
    })
    return result?.inTheaters ?? null
  }
}
