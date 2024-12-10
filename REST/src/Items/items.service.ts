import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateItemDto } from "./dto/create-item.dto";
import { UpdateItemDto } from "./dto/update-item.dto";
import { Item } from "./entities/item.entity";

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ["restaurant"] });
  }

  async findOne(id: number): Promise<Item> {
    return this.itemRepository.findOne({ where: { id }, relations: ["restaurant"] });
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    await this.itemRepository.update(id, updateItemDto);
    return this.itemRepository.findOne({ where: { id }, relations: ["restaurant"] });
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}