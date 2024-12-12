import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {User} from "./entities/user.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {

    }
  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll(): Promise<User[]>{
    return this.repo.find();
  }

  findOne(id: number) : Promise<User> {
    return this.repo.findOne({ where: { id }} );
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
