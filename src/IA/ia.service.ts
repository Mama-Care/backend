// ask.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AskService {
  constructor(private readonly httpService: HttpService) {}

  async sendData(question: string) {
    try {
      console.log('Pergunta: ', question);
      const response = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:5050/ask', {
          question: question,
        }),
      );
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao enviar dados: ${error.message}`);
    }
  }
}
