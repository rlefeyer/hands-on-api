import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private users: User[] = [];
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.age = createUserDto.age;
    user.gender = createUserDto.gender;
    user.password = createUserDto.password;
    this.users.push(user);
    return Promise.resolve(user);
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user: User = this.users.find((user) => user.id === id);
    user.name = updateUserDto.name;
    user.username = updateUserDto.username;
    user.email = updateUserDto.email;
    user.age = updateUserDto.age;
    user.gender = updateUserDto.gender;
    user.password = updateUserDto.password;
    return user;
  }

  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }
}
