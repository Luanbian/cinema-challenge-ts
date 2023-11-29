import { makeCreateEmployerMock } from '../../data/mocks/create.employer.mock'
import { type EmployerDto, type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { Roles } from '../../domain/enums/roles.enum'
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
    const { sut } = makeSut()
    const body: EmployerDto = {
      name: 'test',
      email: 'test@email.com',
      password: '****',
      role: Roles.ADMIN
    }
    const httpResponse = await sut.handle(body)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'employer_id_test',
      name: 'employer_name_test',
      email: 'employer_email_test',
      password: 'employer_pass_test',
      role: Roles.ADMIN
    })
  })
  test('should return status code 500 if controller throws', async () => {
    const { sut, create } = makeSut()
    jest.spyOn(create, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const body: EmployerDto = {
      name: 'test',
      email: 'test@email.com',
      password: '****',
      role: Roles.ADMIN
    }
    const httpResponse = await sut.handle(body)
    expect(httpResponse.statusCode).toBe(500)
  })
})
