import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.tdo';
import { promises } from 'dns';
// import { UserController } from 'src/modules/users/api/user.controller';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<string> {
    // check user email, convert password in hash 
    // compare with existing password and email 
    // if exist then generate json token with user id and session info 
    // and return it to response
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<string> {
    // Try to get user from email 
    // if user exist then throw error already user exist
    // else not exist then convert password into hash using bcrypt
    // create entry in database with has password
    return this.authService.register(registerDto);
  }
}
