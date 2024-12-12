import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }

  async findBy(username: string, password: string): Promise<User | null> {
    this.logger.log(`Tentative de connexion pour l'utilisateur: ${username}`);

    const user = await this.usersRepository.findOne({
      where: {
        username,
        password, // Note: En production, il faudrait hasher le password
      },
    });

    if (!user) {
      this.logger.warn(`Échec de connexion pour l'utilisateur: ${username}`);
      throw new NotFoundException(
        'Utilisateur non trouvé ou mot de passe incorrect',
      );
    }

    this.logger.log(`Connexion réussie pour l'utilisateur: ${username}`);
    return user;
  }
}
