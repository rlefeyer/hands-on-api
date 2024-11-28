import { ApiProperty } from "@nestjs/swagger";
import {Column, PrimaryGeneratedColumn} from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: "1", required: true })
  id: string;
  @Column({type: "varchar", length: 60})
  @ApiProperty({ example: "John Doe", required: true })
  name: string;
  @Column({type: "varchar", length: 30})
  @ApiProperty({ example: "+33 7 66 23 97 97", required: false })
  phone: string | null;
  @Column({type: "varchar", length: 255})
  @ApiProperty({ example: "42 rue Sainte-Catherine", required: true })
  address: string;
}
