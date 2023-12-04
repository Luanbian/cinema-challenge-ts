import { type Movie } from '../../domain/entities/movie'

export interface queryParamns {
  column?: string
  type?: 'asc' | 'desc'
  limit?: string
  page?: string
}

export interface IlistMovie {
  perform: (paramns: queryParamns) => Promise<{
    result: Movie[]
    length: number
    hasMore: boolean
  }>
}
