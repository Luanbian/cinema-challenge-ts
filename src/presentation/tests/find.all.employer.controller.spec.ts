import { makeListEmployerMock } from '../../data/mocks/list.employer.mock'
import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { Roles } from '../../domain/enums/roles.enum'
import { FindAllEmployerController, type FindAllEmployerControllerProps } from '../controllers/find.all.employer.controller'

interface SutProps {
  sut: FindAllEmployerController
  list: IlistEmployer
}

const makeSut = (): SutProps => {
  const list = makeListEmployerMock()
  const sut = new FindAllEmployerController(list)
  return { sut, list }
}
describe('FindAllEmployerController', () => {
  test('should return status 200 and list employers if logged user be admin with success', async () => {
    const { sut } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'ADMIN'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      content: [{
        id: 'test_id',
        name: 'test_name',
        email: 'test_email@gmail.com',
        password: 'test_password',
        role: Roles.ADMIN
      }, {
        id: 'test_id',
        name: 'test_name',
        email: 'test_email@gmail.com',
        password: 'test_password',
        role: Roles.ADMIN
      }],
      length: 2
    })
  })
  test('should return status 200 and list employers if logged user be consulter with success', async () => {
    const { sut } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'CONSULTER'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      content: [{
        id: 'test_id',
        name: 'test_name',
        email: 'test_email@gmail.com',
        password: 'test_password',
        role: Roles.ADMIN
      }, {
        id: 'test_id',
        name: 'test_name',
        email: 'test_email@gmail.com',
        password: 'test_password',
        role: Roles.ADMIN
      }],
      length: 2
    })
  })
  test('should return 401 unauthorized if logged user be manager', async () => {
    const { sut } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'MANAGER'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be cadastrer', async () => {
    const { sut } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'CADASTRER'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if logged user be trainee', async () => {
    const { sut } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'TRAINEE'
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return 401 unauthorized if user not be logged', async () => {
    const { sut } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: undefined
    }
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual('Você não tem permissão para acessar essa rota')
  })
  test('should return status code 204 if no content', async () => {
    const { sut, list } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'ADMIN'
    }
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return {
        result: [],
        length: 0
      }
    })
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(204)
  })
  test('should return status code 500 server error if controller throws', async () => {
    const { sut, list } = makeSut()
    const paramns: FindAllEmployerControllerProps = {
      role: 'ADMIN'
    }
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle(paramns)
    expect(httpResponse.statusCode).toBe(500)
  })
})
