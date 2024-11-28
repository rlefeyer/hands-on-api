import {Menu} from "../../menus/entities/menu.entity";
import {User} from "../../user/entities/user.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsObject} from "class-validator";
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: string;

    @Column({type: "json" })
    @OneToMany(() => Menu, menu => menu.restaurant)
    @ApiProperty({example: [{id: '1', name: 'MaxiBestOf', description: 'Le meilleur menu de chez McDo', prix: 10, restaurant: 'McDo'}]})
    @IsObject()
    order: Menu[];

    @Column({type: "int"})
    @ApiProperty({example: 10})
    @IsNumber()
    prix: number;

    @ApiProperty({example: {name: 'John', adresse: '5 rue de la paix', telephone: '0606060606'}})
    @IsObject()
    User: User;
}
