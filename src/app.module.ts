import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { MailModule } from './mail/mail.module';
import { AskModule } from './IA/ai.module';

@Module({
  imports: [AuthModule, MailModule, AskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
