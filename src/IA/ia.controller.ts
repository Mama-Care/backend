import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { IaService } from './ia.service';

@Controller('ask')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @Post('sendQuestion')
  async ask(@Body('question') question: string) {
    return this.iaService.sendData(question);
  }

  @Get('user/:uid')
  async getUserData(@Param('uid') uid: string): Promise<any> {
    const data = await this.iaService.getUserData(uid);
    return { conteudo: data }; // Retorna os dados em formato JSON
  }
}
