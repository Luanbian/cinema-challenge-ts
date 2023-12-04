import { PrismaClient } from '@prisma/client'
import { makeEncrypterAdapter } from '../../src/main/factories/adapter.factory'
const prisma = new PrismaClient()

async function main (): Promise<void> {
  const hash = makeEncrypterAdapter()
  const employer = await prisma.employers.create({
    data: {
      id: 'seed_id',
      name: 'seed_employer',
      email: 'seed@test.com',
      password: await hash.encrypt('123'),
      role: 'ADMIN'
    }
  })
  const movie = await prisma.movies.create({
    data: {
      id: 'seed_id',
      name: 'seed_name',
      synopsis: 'seed_synopsis',
      releaseDate: new Date(),
      inTheaters: true
    }
  })
  console.log(employer, movie)
}

main().then(async () => {
  console.log('executed')
}).catch(async (error) => {
  console.log(error)
})
