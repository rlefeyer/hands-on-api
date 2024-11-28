import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private users: User[] = [];
  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.phone = createUserDto.phone;
    user.address = createUserDto.address;
    user.id = String(this.users.length + 1);
    this.users.push(user);
    return user;
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
    user.phone = updateUserDto.phone;
    user.address = updateUserDto.address;
    return user;
  }

  remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return this.users;
  }
}
