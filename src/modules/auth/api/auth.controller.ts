import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
// import { UserController } from 'src/modules/users/api/user.controller';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Post('register')
  register() {
    return this.authService.register();
  }
}
