import { Controller, Post, Body } from '@nestjs/common';
import { AskService } from './ia.service';

@Controller('ask')
export class AskController {
  constructor(private readonly askService: AskService) {}

  @Post('sendQuestion')
  async ask(@Body('question') question: string) {
    return this.askService.sendData(question);
  }
}
