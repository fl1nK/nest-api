import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { PostModel } from '../posts/posts.model';

interface UserCreateAttributes {
  email:string;
  password:string;
}

@Table({tableName: 'users'})
export class User extends Model<User,UserCreateAttributes>{
  @ApiProperty({example: '1', description: 'User ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'user@gmail.com', description: 'Email'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email:string

  @ApiProperty({example: '123456', description: 'Password'})
  @Column({type: DataType.STRING, allowNull: false})
  password:string

  @ApiProperty({example: 'true', description: 'Banned or not banned'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned:boolean

  @ApiProperty({example: 'For hooliganism', description: 'Reason for ban'})
  @Column({type: DataType.STRING, allowNull: true})
  banReason:string

  @BelongsToMany(() => Role, ()=> UserRoles)
  roles: Role[]

  @HasMany(() => PostModel)
  posts: PostModel[];
}