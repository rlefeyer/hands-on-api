import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Créer un nouvel utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  // Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  // Récupérer un utilisateur par son ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé.`);
    }
    return user;
  }

  async findBy(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: username, password: password },
    });

    console.log('user', user);

    if (!user) {
      throw new NotFoundException(
        `Aucun utilisateur trouvé avec le nom "${username}" et le mot de passe fourni.`,
      );
    }
    return user;
  }

  // Mettre à jour un utilisateur
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updatedUser = { ...user, ...updateUserDto };
    await this.userRepository.update(id, updatedUser);
    return this.userRepository.findOneBy({ id });
  }

  // Supprimer un utilisateur
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
