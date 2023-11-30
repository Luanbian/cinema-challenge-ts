import { type Iauth } from '../../presentation/controllers/login.employer.controller'

export interface Ilogin {
  perform: (auth: Iauth) => Promise<string | null>
}
