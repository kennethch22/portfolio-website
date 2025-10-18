import { prisma } from '../lib/prisma';

async function main() {
  console.log('Testing database connection...');
  
  // Try to count users
  const userCount = await prisma.user.count();
  console.log(`✅ Connected! Users in database: ${userCount}`);
}

main()
  .catch((e) => {
    console.error('❌ Database connection failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });