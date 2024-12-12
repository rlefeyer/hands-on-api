import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUserDto);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.userRepository.findOne({where: {id}});
    }

    async findBy(name: string, password: string): Promise<User> {
        return this.userRepository.findOne({where: {name, password}}).then((user) => {
            return user;
        }).catch((e) => {
            console.log(e);
            throw e;
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user: User = new User();
        user.name = updateUserDto.name;
        user.adresse = updateUserDto.adresse;
        user.telephone = updateUserDto.telephone;
        return this.userRepository.update(id, user).then(() => {
            return this.userRepository.findOne({where: {id}});
        });
    }

    async remove(id: number): Promise<boolean> {
        return this.userRepository.delete(id).then((item) => {
            return item.affected >= 1;
        });
    }
}
