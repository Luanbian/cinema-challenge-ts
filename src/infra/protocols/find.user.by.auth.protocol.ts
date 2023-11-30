import { type Employer } from '../../domain/entities/employer'
import { type Iauth } from '../../presentation/controllers/login.employer.controller'

export interface IfindUserByAuth {
  findUserByAuth: (auth: Iauth) => Promise<Employer | null>
}
