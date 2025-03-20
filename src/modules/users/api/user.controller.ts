import { Controller, Get, Post, Patch, Delete } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Post()
  createUser() {
    return 'create'
  }

  @Get()
  getAllUser() {
    return 'user'
  }

  @Get()
  getUser(id: string) {
    return 'single user'
  }

  @Patch()
  updateUser(id: string) {
    return 'update'
  }

  @Delete() 
  deleteUser(id: string) {
    return 'delete'
  }
}
