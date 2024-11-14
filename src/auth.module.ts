import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from './firebase/firebase.service';
import { MailService } from './mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  providers: [AuthService, FirebaseService],
  controllers: [AuthController],
})
export class AuthModule {}
