import { type Employer } from '../../domain/entities/employer'

export interface IsaveEmployers {
  save: (data: Employer) => Promise<void>
}
