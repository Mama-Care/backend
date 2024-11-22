import { Injectable } from '@nestjs/common';
import { FirebaseService } from './firebase/firebase.service';

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
      throw new Error('Email ou senha incorretos' + error);
    }
  }

}
