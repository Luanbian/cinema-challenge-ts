import { type Employer } from '../../domain/entities/employer'
import { type Roles } from '../../domain/enums/roles.enum'

export interface EmployerDto {
  id: string
  name: string
  email: string
  password: string
  role: Roles
}

export interface IcreateEmployer {
  perform: (props: EmployerDto) => Promise<Employer>
}
