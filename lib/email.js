require('dotenv').config();
import nodemailer  from "nodemailer";

export async function email(emailConfig) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EmailHost,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EmailUsername, 
        pass: process.env.EmailPassword, 
      },
    });
    
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: emailConfig.from, // sender address
      to: emailConfig.to, // list of receivers
      subject: emailConfig.subject, // Subject line
      html: emailConfig.html,
    });

    console.log("Message sent: %s", info.messageId);
  }
  