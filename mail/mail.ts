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

export default async function sendMail({ email, otp }: { email: string; otp: string }) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Cloud OTP Service" <atmajoc@gmail.com>', // sender address
        to: `nahabiswassrijita@gmail.com`,
        subject: "OTP for veification", // Subject line
        text: `The OTP sent from Cloud OTP Service. Your OTP is ${otp}.`, // plain text body
        html: `<b>The OTP sent from Cloud OTP Service. Your OTP is ${otp}.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

