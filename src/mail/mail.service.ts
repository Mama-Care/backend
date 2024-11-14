import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as admin from 'firebase-admin';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendLinkResetPasswordToEmail(email: string) {
    const resetLink = await admin.auth().generatePasswordResetLink(email);

    await this.mailerService.sendMail({
      to: email,
      subject: 'Redefinição de Senha',
      template: 'passwordReset', // Nome do arquivo de template sem extenção
      context: {
        // Dados para o template
        name: email,
        url: resetLink,
      },
    });
  }
}
