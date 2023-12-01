import { type LoginEmployerControllerProps } from '../../presentation/controllers/login.employer.controller'

export interface Ilogin {
  perform: (auth: LoginEmployerControllerProps) => Promise<string>
}
