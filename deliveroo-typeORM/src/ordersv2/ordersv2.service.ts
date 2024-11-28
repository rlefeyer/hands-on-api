import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdersv2Dto } from './dto/create-ordersv2.dto';
import { UpdateOrdersv2Dto } from './dto/update-ordersv2.dto';
import { Ordersv2 } from './entities/ordersv2.entity';
import { Item } from 'src/items/entities/item.entity';

@Injectable()
export class Ordersv2Service {
  constructor(
    @InjectRepository(Ordersv2)
    private readonly ordersv2Repository: Repository<Ordersv2>,
  ) {}

  // Créer une nouvelle commande v2
  async create(createOrdersv2Dto: CreateOrdersv2Dto): Promise<Ordersv2> {
    const newOrder = this.ordersv2Repository.create(createOrdersv2Dto);
    return await this.ordersv2Repository.save(newOrder);
  }

  // Récupérer toutes les commandes v2
  async findAll(): Promise<Ordersv2[]> {
    return await this.ordersv2Repository.find({
      relations: ['items'],
    });
  }

  // Récupérer une commande v2 par son ID
  async findOne(id: number): Promise<Ordersv2> {
    const order = await this.ordersv2Repository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!order) {
      throw new NotFoundException(`Commande avec l'ID ${id} non trouvée.`);
    }
    return order;
  }

  // Mettre à jour une commande v2
  async update(
    id: number,
    updateOrdersv2Dto: UpdateOrdersv2Dto,
  ): Promise<Ordersv2> {
    const order = await this.findOne(id);
    const updatedOrder = { ...order, ...updateOrdersv2Dto };
    await this.ordersv2Repository.update(id, updatedOrder);
    return this.ordersv2Repository.findOne({
      where: { id },
      relations: ['items'], // Inclure les items mis à jour
    });
  }

  // Supprimer une commande v2
  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.ordersv2Repository.remove(order);
  }

  // Récupérer tous les items d'une commande v2
  async findItems(id: number): Promise<Item[]> {
    const order = await this.findOne(id);
    return order.items;
  }
}
