import { type Employer } from '../../domain/entities/employer'
import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IlistEmployer } from '../protocols/list.employer.protocol'

export class ListEmployer implements IlistEmployer {
  constructor (private readonly repository: IfindAllEmployers) {}

  public async perform (): Promise<{ result: Employer[], length: number, hasMore: boolean }> {

  }
}
