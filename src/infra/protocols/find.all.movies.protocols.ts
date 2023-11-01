import { type Movies } from '@prisma/client'

export interface queryProps {
  column: string
  type: string
  limit: string
  page: string
}

export interface IfindAllMovies {
  findAll: (paramns: queryProps) => Promise<{
    result: Movies[]
    length: number
    hasMore: boolean
  }>
}
