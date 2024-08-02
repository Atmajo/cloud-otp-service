import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'louie.windler@ethereal.email',
        pass: '9DXtfVKqY7ZuNdeSmB'
    }
});

async function sendMail({ email, otp }: { email: string; otp: string }) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Louie Windler" <louie.windler@ethereal.email>', // sender address
        to: email,
        subject: "OTP for veification", // Subject line
        text: `The OTP sent from Cloud OTP Service. Your OTP is ${otp}.`, // plain text body
        html: `<b>The OTP sent from Cloud OTP Service. Your OTP is ${otp}.</b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

export default sendMail