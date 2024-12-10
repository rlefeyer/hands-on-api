import {Menu} from "../../menus/entities/menu.entity";
import {ApiProperty} from "@nestjs/swagger";
import {IsObject, IsString} from "class-validator";
import {Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Item} from "../../items/entities/item.entity";

@Entity()
export class Restaurant {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: "McDo"})
    @IsString()
    name: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: "Le meilleur fast-food"})
    @IsString()
    description: string;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: "fast-food"})
    @IsString()
    categorie: string;

    @Column({type: "varchar", length: 255})
    @ApiProperty({example: "5 rue de la paix"})
    @IsString()
    adresse: string;

    @OneToMany(() => Item, item => item.restaurant, {cascade: true})
    @JoinTable()
    @ApiProperty({
        type: () => [Item],
        description: "The menu of the restaurant",
        example: [{
            id: 1,
            name: "MaxiBestOf",
            description: "Le meilleur menu de chez McDo",
            prix: 10,
        }],
    })
    @IsObject()
    menu: Item[];

    @Column({type: "int"})
    @ApiProperty({example: 10})
    @IsString()
    note: number;

    @Column({type: "varchar", length: 30})
    @ApiProperty({example: "10h-22h"})
    @IsString()
    horaires: string;
}
