import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { MailController } from '../mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true para 465, false para outros
        auth: {
          user: 'contato.ergoeasy@gmail.com',
          pass: 'zhab banv rzse vbsx',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: './src/mail/templates/', // Diretório dos templates de e-mail
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule {}
