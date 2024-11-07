import { Injectable } from '@nestjs/common';
import { CreateCommandeDtoV1 } from './dto/create-commande-v1.dto';
import { CreateCommandeDtoV2 } from './dto/create-commande-v2.dto';
import { UpdateCommandeDtoV1 } from './dto/update-commande-v1.dto';

@Injectable()
export class CommandeService {
  create(createCommandeDto: CreateCommandeDtoV1) {
    return 'This action adds a new commande';
  }

  createV2(createCommandeDto: CreateCommandeDtoV2) {
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

  update(id: number, updateCommandeDto: UpdateCommandeDtoV1) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
