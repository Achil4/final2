import transporter from '../config/nodemailer.js'

export const sendMail = (to, subject, text) => {
  const mailOptions = {
    from: 'gastoncarrizo123@gmail.com',
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};




