import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('cadastrar')
  async signUp(@Body('email') email: string, @Body('senha') password: string) {
    return await this.authService.cadastrar(email, password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('senha') password: string) {
    return await this.authService.login(email, password);
  }

  @Post('esqueci-senha')
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.esqueciSenha(email);
  }
}
