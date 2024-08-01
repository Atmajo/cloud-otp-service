import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function verifyotp({ otp }: { otp: string }) {
  if (otp) {
    try {
      const otpdb = await prisma.otp.update({
        where: {
          otp,
        },
        data: {
          isVerified: true,
        },
      });

      return otpdb;
    } catch (e) {
      console.error(e);
    }
  }
}

export default verifyotp;
