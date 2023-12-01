import { type Movie } from '../../domain/entities/movie'
import { type FindAllMovieControllerProps } from '../../presentation/controllers/find.all.movie.controller'

export interface IlistMovie {
  perform: (paramns: FindAllMovieControllerProps) => Promise<{
    result: Movie[]
    length: number
    hasMore: boolean
  }>
}
