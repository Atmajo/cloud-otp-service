var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: 'smtp.gmail.email',
    port: 465,
    secure: true,
    auth: {
        user: 'atmajoc@gmail.com',
        pass: 'njaa gxhh alik ulhi'
    }
});
export default function sendMail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, otp }) {
        // send mail with defined transport object
        const info = yield transporter.sendMail({
            from: '"Cloud OTP Service" <atmajoc@gmail.com>', // sender address
            to: `nahabiswassrijita@gmail.com`,
            subject: "OTP for veification", // Subject line
            text: `The OTP sent from Cloud OTP Service. Your OTP is ${otp}.`, // plain text body
            html: `<b>The OTP sent from Cloud OTP Service. Your OTP is ${otp}.</b>`, // html body
        });
        console.log("Message sent: %s", info.messageId);
    });
}
