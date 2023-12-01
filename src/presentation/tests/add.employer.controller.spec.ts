import { makeCreateEmployerMock } from '../../data/mocks/create.employer.mock'
import { type IcreateEmployer } from '../../data/protocols/create.employer.protocol'
import { Roles } from '../../domain/enums/roles.enum'
import { AddEmployerController, type AddEmployerControllerProps } from '../controllers/add.employer.controller'

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
  test('should return status code 201 and employer entity if loggeed user be admin with success', async () => {
    const { sut } = makeSut()
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: 'ADMIN'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'employer_id_test',
      name: 'employer_name_test',
      email: 'employer_email_test',
      password: 'employer_pass_test',
      role: Roles.ADMIN
    })
  })
  test('should return status code 201 and employer entity if loggeed user be cadastrer with success', async () => {
    const { sut } = makeSut()
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: 'CADASTRER'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(201)
    expect(httpResponse.body).toEqual({
      id: 'employer_id_test',
      name: 'employer_name_test',
      email: 'employer_email_test',
      password: 'employer_pass_test',
      role: Roles.ADMIN
    })
  })
  test('should return 401 unauthorized if logged user be manager', async () => {
    const { sut } = makeSut()
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: 'MANAGER'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be consulter', async () => {
    const { sut } = makeSut()
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: 'CONSULTER'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be trainee', async () => {
    const { sut } = makeSut()
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: 'TRAINEE'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if user not be logged', async () => {
    const { sut } = makeSut()
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: undefined
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return status code 500 if controller throws', async () => {
    const { sut, create } = makeSut()
    jest.spyOn(create, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const paramns: AddEmployerControllerProps = {
      dto: {
        id: 'valid_test_id',
        name: 'test',
        email: 'test@email.com',
        password: '****',
        role: Roles.ADMIN
      },
      role: 'ADMIN'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(500)
  })
})
