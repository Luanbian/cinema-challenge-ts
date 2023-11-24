import { type IlistEmployer } from '../../data/protocols/list.employer.protocol'
import { Roles, type Employer } from '../../domain/entities/employer'
import { FindAllEmployerController } from '../controllers/find.all.employer.controller'

interface SutProps {
  sut: FindAllEmployerController
  list: IlistEmployer
}

const makeListEmployerMock = (): IlistEmployer => {
  class ListEmployerMock implements IlistEmployer {
    public async perform (): Promise<{ result: Employer[], length: number }> {
      return {
        result: [{
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
      }
    }
  }
  return new ListEmployerMock()
}

const makeSut = (): SutProps => {
  const list = makeListEmployerMock()
  const sut = new FindAllEmployerController(list)
  return { sut, list }
}
describe('FindAllEmployerController', () => {
  test('should be able to return status code 200 and list employers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
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
  test('should return status code 204 if no content', async () => {
    const { sut, list } = makeSut()
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return {
        result: [],
        length: 0
      }
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(204)
  })
  test('should return status code 500 server error if controller throws', async () => {
    const { sut, list } = makeSut()
    jest.spyOn(list, 'perform').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => {
        reject(new Error())
      })
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
  })
})
