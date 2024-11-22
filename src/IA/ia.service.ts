// ask.service.ts
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class IaService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly httpService: HttpService,
  ) {}

  async saveUserData(
    uid: string,
    idFirebase: string,
    conteudo: any,
  ): Promise<void> {
    const database = this.firebaseService.getDatabase();

    // Caminho no Firebase para o `idFirebase`
    const ref = database.ref(`users/${uid}/conteudo/${idFirebase}`);

    // Transação para garantir consistência
    await ref.transaction((conteudoAtual) => {
      if (!conteudoAtual) {
        // Cria novo conteúdo se o `idFirebase` não existir
        return {
          conteudo: [conteudo],
          criadoEm: conteudo.criadoEm,
        };
      }

      // Acrescenta o novo conteúdo ao array existente
      return {
        ...conteudoAtual,
        conteudo: [...(conteudoAtual.conteudo || []), conteudo],
      };
    });
  }

  async sendData(question: string) {
    interface Conteudo {
      id: string;
      criadoEm: string;
      pergunta: string;
      resposta: string;
    }

    try {
      console.log('Pergunta: ', question);
      const response = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:5050/ask', {
          question: question,
        }),
      );

      const currentDateTime = new Date();

      const content: Conteudo = {
        id: '123',
        criadoEm: currentDateTime.toString(),
        pergunta: question,
        resposta: response.data.answer,
      };

      console.log('CONTEUDO: ' + JSON.stringify(content, null, 2));

      const uid = 'user456';

      const idFirebase = '';

      await this.saveUserData(uid, idFirebase, content);

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao enviar dados: ${error.message}`);
    }
  }

  // Recuperar dados do Firebase
  async getUserData(uid: string): Promise<any[]> {
    const database = this.firebaseService.getDatabase();
    const snapshot = await database.ref(`users/${uid}/conteudo`).once('value');
    const data = snapshot.val();

    if (!data) {
      return []; // Retorna uma lista vazia se não houver dados
    }

    // Converte o objeto em uma lista de objetos com os IDs incluídos
    return Object.entries(data).map(([key, value]: [string, any]) => ({
      idFirebase: key,
      ...value,
    }));
  }
}
