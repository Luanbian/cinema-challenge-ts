import { type Employer } from '../../domain/entities/employer'

export interface IlistEmployer {
  perform: () => Promise<{
    result: Employer[]
    length: number
  }>
}
