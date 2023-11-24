export interface EmployerProps {
  id: string
  name: string
  email: string
  password: string
  role: Roles
}

export enum Roles {
  ADMIN = 'ADMIN',
  CADASTRER = 'CADASTRER',
  MANAGER = 'MANAGER',
  CONSULTER = 'CONSULTER',
  TRAINEE = 'TRAINEE',
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
