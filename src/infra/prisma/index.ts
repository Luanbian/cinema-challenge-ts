import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NODE_ENV === process.env.STATUS ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL
    }
  }
})

export default prisma
