import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreateAttributes {
  value:string;
  description:string;
}

@Table({tableName: 'roles'})
export class Role extends Model<Role,RoleCreateAttributes>{
  @ApiProperty({example: '1', description: 'User ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'ADMIN', description: 'User role'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value:string

  @ApiProperty({example: 'Administrator', description: 'Description role'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  description:string

  @BelongsToMany(() => User, ()=> UserRoles)
  user: User[]
}