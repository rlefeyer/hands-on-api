import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCommandeDtoV1 } from './dto/create-commande-v1.dto';
import { CreateCommandeDtoV2 } from './dto/create-commande-v2.dto';
import { UpdateCommandeDtoV1 } from './dto/update-commande-v1.dto';
import { UpdateCommandeDtoV2 } from './dto/update-commande-v2.dto';
import { Commande } from './entities/commande-v2.entity';
import { Item } from '../items/entities/item.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommandeService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Commande)
    private readonly commandeRepository: Repository<Commande>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createV1(createCommandeDto: CreateCommandeDtoV1) {
    return 'This action adds a new commande';
  }
  
  updateV1(id: number, updateCommandeDto: UpdateCommandeDtoV1) {
    return `This action updates a #${id} commande`;
  }

  async create(createCommandeDto: CreateCommandeDtoV2): Promise<Commande> {
    try {
      const items = await this.itemRepository.findBy({ id: In(createCommandeDto.itemsIds)});
      const user = await this.userRepository.findOneBy({id: createCommandeDto.userId});
      const newCommande = this.commandeRepository.create({...createCommandeDto, items, user});
      return await this.commandeRepository.save(newCommande);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Failed to create commande');
    }
  }

  async findAll(): Promise<Commande[]> {
    try {
      return await this.commandeRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve commandes');
    }
  }

  async findOne(id: number): Promise<Commande> {
    try {
      const commande = await this.commandeRepository.findOne({ where: { id }});
      if (!commande) {
        throw new NotFoundException(`Commande with ID ${id} not found`);
      }
      return commande;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve commande');
    }
  }

  async update(id: number, updateCommandeDto: UpdateCommandeDtoV2): Promise<Commande> {
    try {
      const result = await this.itemRepository.update(id, updateCommandeDto);
      if (result.affected === 0) {
        throw new NotFoundException(`Commande with ID ${id} not found`);
      }
      const updatedCommande = await this.findOne(id);
      return updatedCommande;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update commande');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.commandeRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Commande with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete commande');
    }
  }
}
