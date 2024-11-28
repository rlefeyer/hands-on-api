import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  // Créer un nouvel item
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem = this.itemRepository.create(createItemDto);
    return await this.itemRepository.save(newItem);
  }

  // Récupérer tous les items
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find({
      relations: ['restaurant'],
    });
  }

  // Récupérer un item par son ID
  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!item) {
      throw new NotFoundException(`Item avec l'ID ${id} non trouvé.`);
    }
    return item;
  }

  // Mettre à jour un item
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);
    const updatedItem = { ...item, ...updateItemDto };
    await this.itemRepository.update(id, updatedItem);
    return this.itemRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
  }

  // Supprimer un item
  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
  }
}
