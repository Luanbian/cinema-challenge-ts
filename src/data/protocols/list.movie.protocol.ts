import { type Movie } from '../../domain/entities/movie'
import { type IParamns } from '../../presentation/controllers/find.all.movie.controller'

export interface IlistMovie {
  perform: (paramns: IParamns) => Promise<{
    result: Movie[]
    length: number
    hasMore: boolean
  }>
}
