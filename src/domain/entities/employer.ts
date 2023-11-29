import { type Roles } from '../enums/roles.enum'

export interface EmployerProps {
  id: string
  name: string
  email: string
  password: string
  role: Roles
}

export class Employer {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly password: string
  readonly role: Roles

  private constructor (props: EmployerProps) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password
    this.role = props.role
  }

  public static create (input: EmployerProps): Employer {
    return new Employer(input)
  }
}
