import { Injectable } from '@nestjs/common';
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll(): Promise<User[]>{
    return this.repo.find();
  }

  findOne(id: number) : Promise<User> {
    return this.repo.findOne({ where: { id }} );
  }
}
