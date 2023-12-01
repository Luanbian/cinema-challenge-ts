import { randomUUID } from 'crypto'
import { Employer } from '../../domain/entities/employer'
import { type IsaveEmployers } from '../../infra/protocols/save.employers.protocols'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'
import { type Encrypter } from '../criptography/protocol/encrypter.protocol'

export class CreateEmployer implements IcreateEmployer {
  constructor (
    private readonly create: IsaveEmployers,
    private readonly encrypter: Encrypter
  ) {}

  public async perform (props: EmployerDto): Promise<Employer> {
    const id = props.id ?? randomUUID()
    const hashPassword = await this.encrypter.encrypt(props.password)
    const employer = Employer.create({ ...props, password: hashPassword, id })
    await this.create.save(employer)
    return employer
  }
}
