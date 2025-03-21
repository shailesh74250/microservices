import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.tdo';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return 'login'
  }

  register(registerDto: RegisterDto) {
    return 'register'
  }
}
