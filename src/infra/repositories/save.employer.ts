import { type Employer } from '../../domain/entities/employer'
import prisma from '../prisma'
import { type IsaveEmployers } from '../protocols/save.employers.protocols'

export class SaveEmployer implements IsaveEmployers {
  public async save (data: Employer): Promise<void> {
    await prisma.employers.createMany({ data: [data] })
  }
}
