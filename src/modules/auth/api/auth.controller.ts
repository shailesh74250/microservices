import { Controller, Get, Post } from '@nestjs/common';
import { UserController } from 'src/modules/users/api/user.controller';

@Controller('auth')
export class AuthController {
  constructor(private userController: UserController) {}

  @Post()
  login() {
    return 'auth'
  }

  @Post()
  register() {
    this.userController.createUser();
  }
}
