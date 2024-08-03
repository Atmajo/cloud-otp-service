var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { configDotenv } from "dotenv";
import usercreate from "./scripts/usercreate.js";
import getuser from "./scripts/getuser.js";
import otpcreate from "./scripts/otpcreate.js";
import getotp from "./scripts/getotp.js";
import verifyotp from "./scripts/verifyotp.js";
import sendMail from "./mail/mail.js";
// import usercreate from "./scripts/usercreate.js";
// import getuser from "./scripts/getuser.js";
// import otpcreate from "./scripts/otpcreate.js";
// import getotp from "./scripts/getotp.js";
// import verifyotp from "./scripts/verifyotp.js";
configDotenv();
const app = express();
let otp_store = {};
app.get("/", (res, req) => {
    req.send("Welcome to Cloud OTP Service");
});
app.get("/send-otp", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    let otp = "";
    const phone = res.query.phone;
    const email = res.query.email;
    function generateOtp() {
        let otpString = "";
        const vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        for (let index = 0; index < 6; index++) {
            otpString = otpString + vals[parseInt(String(Math.random() * 10))];
        }
        return otpString;
    }
    if ((phone === null || phone === void 0 ? void 0 : phone.length) === 10) {
        otp = generateOtp();
        try {
            if (yield getuser({ phone: phone })) {
                const user = yield getuser({ phone: phone });
                const otpdb = yield otpcreate({ otp: otp, userId: user === null || user === void 0 ? void 0 : user.id });
                req.send(`Your OTP is ${otpdb === null || otpdb === void 0 ? void 0 : otpdb.otp}`);
            }
            else {
                yield usercreate({ phone: phone });
                const user = yield getuser({ phone: phone });
                const otpdb = yield otpcreate({ otp: otp, userId: user === null || user === void 0 ? void 0 : user.id });
                try {
                    yield sendMail({ email, otp });
                    req.send(`Your OTP is ${otp}`);
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        catch (e) {
            console.error;
        }
    }
    else {
        req.send("Invalid number");
    }
}));
app.get("/verify-otp", (res, req) => __awaiter(void 0, void 0, void 0, function* () {
    const otp = res.query.otp;
    if (otp) {
        try {
            const otpdb = yield getotp({ otp: otp });
            if (otp === (otpdb === null || otpdb === void 0 ? void 0 : otpdb.otp)) {
                yield verifyotp({ otp: otp });
                req.send("Verified");
            }
            else {
                req.send("Invalid OTP");
            }
        }
        catch (e) {
            console.error(e);
        }
    }
}));
app.listen(process.env.PORT, () => {
    console.log(`Server started in http://localhost:${process.env.PORT}`);
});
