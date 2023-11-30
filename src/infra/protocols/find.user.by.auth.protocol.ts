import { type Employer } from '../../domain/entities/employer'

export interface IfindUserByAuth {
  findUserByAuth: (email: string) => Promise<Employer | null>
}
