import { randomUUID } from 'crypto'
import { Employer } from '../../domain/entities/employer'
import { type EmployerDto, type IcreateEmployer } from '../protocols/create.employer.protocol'

interface SutProps {
  sut: IcreateEmployer
  repositoryStub: IsaveEmployers
}

interface IsaveEmployers {
  save: (data: Employer) => Promise<void>
}

const makeSaveEmployerStub = (): IsaveEmployers => {
  class SaveEmployerStub implements IsaveEmployers {
    public async save (data: Employer): Promise<void> {}
  }
  return new SaveEmployerStub()
}

class CreateEmployer implements IcreateEmployer {
  constructor (private readonly create: IsaveEmployers) {}

  public async perform (props: EmployerDto): Promise<Employer> {
    const id = randomUUID()
    const employer = Employer.create({ id, ...props })
    return employer
  }
}

const makeSut = (): SutProps => {
  const repositoryStub = makeSaveEmployerStub()
  const sut = new CreateEmployer(repositoryStub)
  return { sut, repositoryStub }
}

describe('CreateEmployer', () => {
  test('should return a employer entity', async () => {

  })
})
