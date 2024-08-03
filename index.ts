import express from "express";
import { configDotenv } from "dotenv";
import { v4 as uuid } from "uuid";
import usercreate from "./scripts/usercreate";
import getuser from "./scripts/getuser";
import otpcreate from "./scripts/otpcreate";
import getotp from "./scripts/getotp";
import verifyotp from "./scripts/verifyotp";
import sendMail from "./mail/mail";

// import usercreate from "./scripts/usercreate.js";
// import getuser from "./scripts/getuser.js";
// import otpcreate from "./scripts/otpcreate.js";
// import getotp from "./scripts/getotp.js";
// import verifyotp from "./scripts/verifyotp.js";

configDotenv();

const app = express();

interface OtpStore {
  id: string;
  phone: string;
  otp: string;
  isVerified: boolean;
}

let otp_store = <OtpStore>{};

app.get("/", (res, req) => {
  req.send("Welcome to Cloud OTP Service");
});

app.get("/send-otp", async (res, req) => {
  let otp = "";
  const phone = res.query.phone as string;
  const email = res.query.email as string;

  function generateOtp() {
    let otpString = "";
    const vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    for (let index = 0; index < 6; index++) {
      otpString = otpString + vals[parseInt(String(Math.random() * 10))];
    }

    return otpString;
  }

  if (phone?.length === 10) {
    otp = generateOtp();

    try {
      if (await getuser({ phone: phone as string })) {
        const user = await getuser({ phone: phone as string });
        const otpdb = await otpcreate({ otp: otp, userId: user?.id! });

        req.send(`Your OTP is ${otpdb?.otp}`);
      } else {
        await usercreate({ phone: phone as string });
        const user = await getuser({ phone: phone as string });
        const otpdb = await otpcreate({ otp: otp, userId: user?.id! });

        try {
          await sendMail({ email, otp })
          req.send(`Your OTP is ${otp}`);
        } catch (e) { console.log(e) }
      }
    } catch (e) {
      console.error;
    }
  } else {
    req.send("Invalid number");
  }
});

app.get("/verify-otp", async (res, req) => {
  const otp = res.query.otp;

  if (otp) {
    try {
      const otpdb = await getotp({ otp: otp as string });

      if (otp === otpdb?.otp) {
        await verifyotp({ otp: otp as string });
        req.send("Verified");
      } else {
        req.send("Invalid OTP");
      }
    } catch (e) {
      console.error(e);
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server started in http://localhost:${process.env.PORT}`);
});
