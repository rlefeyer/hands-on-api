import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';

@Injectable()
export class CommandeService {
  create(createCommandeDto: CreateCommandeDto) {
    return 'This action adds a new commande';
  }

  findAll() {
    return `This action returns all commande`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  findMenus(id: number) {
    return `This action returns the menus from a #${id} commande`;
  }

  findItems(id: number) {
    return `This action returns the items from a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
