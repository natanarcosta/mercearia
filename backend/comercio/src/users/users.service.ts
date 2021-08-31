import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createUser(newUser: CreateUserDto) {
    /*     if (this.userRepo.findOne(newUser.username)) {
      throw new ForbiddenException('Username já em uso!');
    } */
    const user = this.userRepo.create({
      username: newUser.username,
      password: newUser.password,
      admin: newUser.admin,
    });
    return this.userRepo.save(user);
  }

  getAllUsers() {
    return this.userRepo.find();
  }

  findUserById(id: number) {
    const user = this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }
    return user;
  }

  async deleteUser(id: number) {
    const user = await this.findUserById(id);
    return this.userRepo.delete(user.id);
  }
}
