import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getotp({ otp }: { otp: string }) {
  if (otp) {
    try {
      const otpdb = await prisma.otp.findUnique({
        where: {
          otp,
        },
      });
      
      return otpdb;
    } catch (e) {
      console.error(e);
    }
  }
}

export default getotp;
