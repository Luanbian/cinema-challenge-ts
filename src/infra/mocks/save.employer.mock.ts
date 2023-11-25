import { type Employer } from '../../domain/entities/employer'
import { type IsaveEmployers } from '../protocols/save.employers.protocols'

export const makeSaveEmployerStub = (): IsaveEmployers => {
  class SaveEmployerStub implements IsaveEmployers {
    public async save (data: Employer): Promise<void> {}
  }
  return new SaveEmployerStub()
}
