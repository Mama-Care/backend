import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('esqueciSenha')
  async forgotPassword(@Body('email') email: string) {
    await this.mailService.sendLinkResetPasswordToEmail(email);
    return { message: 'E-mail de redefinição de senha enviado!' };
  }
}
