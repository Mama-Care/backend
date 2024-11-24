import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ask')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('sendQuestion/:id')
  async ask(@Param('id') id: string, @Body('question') question: string) {
  return this.iaService.sendData(id, question);
}

  @Get('user/:id') 
  async getUserData(@Param('id') id: string): Promise<any> {
    const data = await this.iaService.getUserData(id);
    return { conteudo: data };
  }
}
