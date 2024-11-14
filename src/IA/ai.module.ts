import { Module } from '@nestjs/common';
import { AskService } from './ia.service';
import { AskController } from './ia.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [AskService],
  controllers: [AskController],
})
export class AskModule {}
