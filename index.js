import express from "express";
import { configDotenv } from "dotenv";
import { v4 as uuid } from "uuid";
import mysql from "mysql";

configDotenv();

const app = express()

let otp_store = {}

app.get('/', (res, req) => {
    req.send("Welcome to Cloud OTP Service")
})

app.get('/send-otp', (res, req) => {
    let otp = "";
    const phone = res.query.phone;

    function generateOtp() {
        let otpString = "";
        const vals = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
        for (let index = 0; index < 6; index++) {
            otpString = otpString + vals[parseInt(Math.random() * 10)]
        }

        return otpString
    }

    if (phone.length === 10) {
        otp = generateOtp();
        otp_store = { "id": uuid(), "phone": phone, "otp": otp, "isVerified": false }

        req.send(`Your OTP is ${otp_store.otp}`)
    } else {
        req.send("Invalid number")
    }
})

app.get("/verify-otp", (res, req) => {
    const otp = res.query.otp;
    req.send(otp === otp_store.otp ? "Verified" : "Not Verified");
})

app.listen(process.env.PORT, () => {
    console.log(`Server started in http://localhost:${process.env.PORT}`)
})