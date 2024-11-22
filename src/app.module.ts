import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth.module';
import { MailModule } from './mail/mail.module';
import { IaModule } from './IA/ai.module';

@Module({
  imports: [AuthModule, MailModule, IaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
