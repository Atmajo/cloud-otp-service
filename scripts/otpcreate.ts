import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface OtpCreate {
  otp: string;
  userId: string;
}

async function otpcreate({ otp, userId }: OtpCreate) {
  if (otp && userId) {
    try {
      const otpdb = await prisma.otp.create({
        data: {
          otp,
          userId,
        },
      });

      return otpdb;
    } catch (e) {
      console.error(e);
    }
  }
}

export default otpcreate;
