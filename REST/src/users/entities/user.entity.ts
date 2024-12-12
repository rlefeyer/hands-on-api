import { ApiProperty } from "@nestjs/swagger";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Role} from "../../auth/role.enum";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: "1", required: true })
  id: string;
  @Column({ type: "varchar", length: 60 })
  @ApiProperty({ example: "John Doe", required: true })
  name: string;
  @ApiProperty({ example: "Michel78", required: false })
  username: string | null;
  @Column({ type: "varchar", length: 255 })
  @ApiProperty({ example: "42 rue Sainte-Catherine", required: true })
  email: string;
  @ApiProperty({ example: "42", required: true })
  age: number;
  @ApiProperty({ example: "u", required: true })
  gender: string;
  @ApiProperty({ example: "ZiBaizeur@59", required: true })
  password: string;
  @ApiProperty()
  role: Role;
}
