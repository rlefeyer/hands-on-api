import {Injectable} from "@nestjs/common";
import {CreateRestaurantDto} from "./dto/create-restaurant.dto";
import {UpdateRestaurantDto} from "./dto/update-restaurant.dto";
import {Repository} from "typeorm";
import {Restaurant} from "./entities/restaurant.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant) private readonly restaurantRepository: Repository<Restaurant>,
    ) {
    }

    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
        return this.restaurantRepository.save(createRestaurantDto);
    }

    findAll(query?: any): Promise<Restaurant[]> {
        return this.restaurantRepository.find({
            where: {name: query.filter},
            order: {name: query.sort},
            take: query.limit,
            skip: query.limit * (query.page - 1),
        });
    }

    findOne(id: number): Promise<Restaurant> {
        return this.restaurantRepository.findOne({where: {id}});
    }

    async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
        return this.restaurantRepository.update(id, updateRestaurantDto).then(() => {
            return this.restaurantRepository.findOne({where: {id}});
        });
    }

    async remove(id: number): Promise<boolean> {
        return this.restaurantRepository.delete(id).then((item) => {
            return item.affected >= 1;
        });
    }
}
