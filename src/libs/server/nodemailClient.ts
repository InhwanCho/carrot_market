import nodemailer from "nodemailer";

const smtpTransport = nodemailer.createTransport({
  service: "Naver",
  host: "smtp.naver.com",
  port: 465,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PW,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (userPayload: string, tokenPayload: string) => {
  const mailOptions = {
    from: process.env.MAIL_ID,
    to: userPayload,
    subject: "[케롯 마켓] 이메일 로그인 인증",
    text: `인증번호는 ${tokenPayload}입니다.`,
  };
  const result = smtpTransport.sendMail(mailOptions, (error, res) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      console.log(res);
      return null;
    }
  });
  smtpTransport.close();
  return console.log(result);
};

export default sendEmail;
