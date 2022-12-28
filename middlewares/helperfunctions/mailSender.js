const nodemailer = require("nodemailer");

const mailSender = async (messageConfig, ...recipients) => {
  try {
    // config
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: `info.earlyoffice@gmail.com`,
        pass: `bsdgboajogzbgsyr`,
      },
    });

    // recipients = [`isaiahekundayo17@gmail.com`, "chiedozie121@gmail.com"];
    // messageConfig = {
    //   title: "Testing 123",
    //   body: "Check if node mailer can work like this",
    // };

    // Sending mail
    recipients.map(async (recipient) => {
      const sendmail = await transporter.sendMail({
        sender: "info.earlyoffice@gmail.com",
        to: `${recipient}`,
        subject: `${messageConfig.title}`,
        html: `${messageConfig.body}`,
      });
    });

    return 250;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = mailSender;
