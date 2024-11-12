import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async cadastrar(email: string, password: string): Promise<any> {
    try {
      const userRecord = await this.firebaseService.auth.createUser({
        email,
        password,
      });
      return { uid: userRecord.uid, email: userRecord.email };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.firebaseService.auth.getUserByEmail(email);
      return { uid: user.uid, email: user.email };
    } catch (error) {
      throw new Error('Email ou senha incorretos');
    }
  }

  async esqueciSenha(email: string) {
    try {
      const resetLink = await admin.auth().generatePasswordResetLink(email);
      return `Link de recuperação de senha enviado para ${email} \n ${resetLink}`
    } catch (error) {
        throw new Error('Erro ao enviar o link de recuperação de senha');
    }
  }
}
