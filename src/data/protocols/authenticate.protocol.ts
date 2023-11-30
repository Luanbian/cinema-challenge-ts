import { type Employer } from '../../domain/entities/employer'

export interface Authenticate {
  generateToken: (user: Employer) => Promise<string>
}
