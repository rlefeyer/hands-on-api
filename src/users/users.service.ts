import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  // Create a new user
  create(createUserDto: CreateUserDto) {
    const newUser = {...createUserDto };
    this.users.push(newUser);
    return Promise.resolve(newUser);
  }

  // Retrieve all users
  findAll() {
    return Promise.resolve(this.users);
  }

  // Retrieve a user by ID
  findOne(id: number) {
    const user = this.users.find(user => user.id === id);
    return Promise.resolve(user);
  }

  // Update a user by ID
  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      Object.assign(user, updateUserDto);
    }
    return Promise.resolve(user);
  }

  // Delete a user by ID
  remove(id: number) {
    this.users = this.users.filter(user => user.id !== id);
    return Promise.resolve();
  }
}
