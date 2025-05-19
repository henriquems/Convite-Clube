import { ProvedorEmail, RepositorioAuth } from '@conviteclube/core';
import { Injectable } from '@nestjs/common';
import sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService implements ProvedorEmail {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async enviarEmail(destinatario: string, assunto: string, corpo: string): Promise<void> {
    const msg = {
      to: destinatario,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: assunto,
      text: corpo,
      html: `<p>${corpo}</p>`,
    };
    await sgMail.send(msg);
  }
}