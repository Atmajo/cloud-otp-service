import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getuser({ phone }: { phone: string }) {
  if (phone) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          phone,
        },
      });

      return user;
    } catch (e) {
      console.error(e);
    }
  }
}

export default getuser;
