import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Hash das senhas utilizando bcrypt
  const userPasswordHash = await hash('userpassword', 10)
  const adminPasswordHash = await hash('adminpassword', 10)

  // Criação do usuário comum com role USER
  const user = await prisma.user.create({
    data: {
      name: 'User',
      email: 'user@salaryfits.com',
      password: userPasswordHash,
      role: 'USER',
    },
  })

  // Criação do administrador (root) com role ADMIN
  const admin = await prisma.user.create({
    data: {
      name: 'root',
      email: 'admin@salaryfits.com',
      password: adminPasswordHash,
      role: 'ADMIN',
    },
  })

  console.log('User created:', user)
  console.log('Admin created:', admin)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
