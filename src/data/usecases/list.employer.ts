import { type Employer, Roles } from '../../domain/entities/employer'
import { type IfindAllEmployers } from '../../infra/protocols/find.all.employers.protocols'
import { type IlistEmployer } from '../protocols/list.employer.protocol'

export class ListEmployer implements IlistEmployer {
  constructor (private readonly repository: IfindAllEmployers) {}

  public async perform (): Promise<{ result: Employer[], length: number }> {
    const { result, length } = await this.repository.findAll()

    const mappedResult = result.map((employer) => ({
      ...employer,
      role: this.mapPrismaRolesToAppRoles(employer.role)
    }))

    return { result: mappedResult, length }
  }

  private mapPrismaRolesToAppRoles (role: string): Roles {
    const roleMap: Record<string, Roles> = {
      ADMIN: Roles.ADMIN,
      CADASTRER: Roles.CADASTRER,
      MANAGER: Roles.MANAGER,
      CONSULTER: Roles.CONSULTER,
      TRAINEE: Roles.TRAINEE
    }

    if (role in roleMap) {
      return roleMap[role]
    }

    throw new Error(`Unexpected role: ${role}`)
  }
}
