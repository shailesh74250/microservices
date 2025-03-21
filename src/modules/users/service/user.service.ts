import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create.user.dto';
import { UpdateUserDto } from '../dtos/update.user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  async getAllUsers() {
    return this.userRepository.find()
  }

  // async getUser(id: number) {
  //   return this.userRepository.findOneBy(id);
  // }

  // async updateUser(id: string, updateUserDto: UpdateUserDto) {
  //   return this.userRepository.update(id, updateUserDto);
  // }

  // deleteUser(id: string) {
  //   return this.userRepository.softDelete(id);
  // }
}
