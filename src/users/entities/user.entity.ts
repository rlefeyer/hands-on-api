import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 30})
  name: string;

    @Column({type: 'varchar', length: 30})
    username: string;

  @Column({type: 'varchar'})
  address: string;

  @Column({type: 'int'})
  phone: string;

  @Column({
    type: 'varchar'
  })
  gender: string;

  @Column({
    type: 'char',
    length: 128
  })
  password: string;



}
