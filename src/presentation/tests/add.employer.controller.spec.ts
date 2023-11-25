import { makeCreateEmployerMock } from '../../data/mocks/create.employer.mock'
import { type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { AddEmployerController } from '../controllers/add.employer.controller'

interface SutProps {
  sut: AddEmployerController
  create: IcreateEmployer
}

const makeSut = (): SutProps => {
  const create = makeCreateEmployerMock()
  const sut = new AddEmployerController(create)
  return { sut, create }
}

describe('AddEmployerController', () => {
  test('should return status code 201 and employer entity if success', async () => {

  })
})
