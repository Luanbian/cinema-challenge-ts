import { type $Enums, Roles } from '@prisma/client'
import { type IfindAllEmployers } from '../protocols/find.all.employers.protocols'

export const makeFindAllEmployersStub = (): IfindAllEmployers => {
  class FindAllEmployersStub implements IfindAllEmployers {
    public async findAll (): Promise<{
      result: Array<{
        id: string
        name: string
        email: string
        password: string
        role: $Enums.Roles
      }>
      length: number
    }> {
      return {
        result: [{
          id: 'id_test',
          name: 'name_test',
          email: 'email_test@gmail.com',
          password: 'passowrd_test',
          role: Roles.ADMIN
        }, {
          id: 'id_test',
          name: 'name_test',
          email: 'email_test@gmail.com',
          password: 'passowrd_test',
          role: Roles.ADMIN
        }],
        length: 2
      }
    }
  }
  return new FindAllEmployersStub()
}
