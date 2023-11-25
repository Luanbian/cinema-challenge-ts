import { randomUUID } from 'crypto'
import { Employer } from '../../domain/entities/employer'
import { type IsaveEmployers } from '../../infra/protocols/save.employers.protocols'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'

export class CreateEmployer implements IcreateEmployer {
  constructor (private readonly create: IsaveEmployers) {}

  public async perform (props: EmployerDto): Promise<Employer> {
    const id = randomUUID()
    const employer = Employer.create({ id, ...props })
    await this.create.save(employer)
    return employer
  }
}
