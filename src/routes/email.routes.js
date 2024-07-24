import { Router } from 'express';
import { sendMail } from '../services/emailService.js';

const router = Router();

router.post('/send-email', (req, res) => {
  const { to, subject, text } = req.body;
  
  sendMail(to, subject, text);
  res.send('Correo enviado');
});

export default router;
