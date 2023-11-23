const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true, //понять что это
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivateionMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта на ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1></h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  }

  async sendConfirmCode(to, code) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Подтверждения входа ${process.env.API_URL}`,
      text: '',
      html: `
        <div>
          <h1></h1>
          <div>Код активации: ${code}</div>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
