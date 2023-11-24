import { type IlistEmployer } from '../protocols/list.employer.protocol'

export class ListEmployer implements IlistEmployer {
  public async perform (): Promise<{ result: Employer[], length: number, hasMore: boolean }> {

  }
}
