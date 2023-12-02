import { type Movie } from '../../domain/entities/movie'
import { type queryParamns } from '../../presentation/controllers/find.all.movie.controller'

export interface IlistMovie {
  perform: (paramns: queryParamns) => Promise<{
    result: Movie[]
    length: number
    hasMore: boolean
  }>
}
