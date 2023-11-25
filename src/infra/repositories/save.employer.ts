import { type Roles } from '@prisma/client'
import { type Employer } from '../../domain/entities/employer'
import prisma from '../prisma'
import { type IsaveEmployers } from '../protocols/save.employers.protocols'

export class SaveEmployer implements IsaveEmployers {
  public async save (data: Employer): Promise<void> {
    const employer = {
      ...data,
      role: data.role.toUpperCase() as Roles
    }
    await prisma.employers.createMany({ data: [employer] })
  }
}
