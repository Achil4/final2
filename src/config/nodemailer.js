import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gastoncarrizo123@gmail.com',
    pass: 'leef pxjp fngy txgi'
  }
});

export default transporter



