import { type Employer, type Roles } from '../../domain/entities/employer'

export interface EmployerDto {
  name: string
  email: string
  password: string
  role: Roles
}

export interface IcreateEmployer {
  perform: (props: EmployerDto) => Promise<Employer>
}
