import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function usercreate({ phone }: { phone: string }) {
  if (phone) {
    try {
      await prisma.user.create({
        data: {
          phone,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default usercreate;
