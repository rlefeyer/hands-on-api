import {Injectable} from "@nestjs/common";
import {CreateItemDto} from "./dto/create-item.dto";
import {UpdateItemDto} from "./dto/update-item.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Item} from "./entities/item.entity";

@Injectable()
export class ItemsService {

    constructor(
        @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    ) {
    }

    async create(createItemDto: CreateItemDto) {
        await this.itemRepository.save(createItemDto);

    }

    findAll() {
        return this.itemRepository.find();
    }

    findOne(id: number) {
        return this.itemRepository.findOne({where: {id}});
    }

    async update(id: number, updateItemDto: UpdateItemDto) {
        return this.itemRepository.update(id, updateItemDto).then(() => {
            return this.itemRepository.findOne({where: {id}});
        });
    }

    async remove(id: number) {
        return this.itemRepository.delete(id).then((item) => {
            return item.affected >= 1;
        });
    }
}
