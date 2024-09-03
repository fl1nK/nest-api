import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Role } from '../roles/roles.model';
import { User } from '../users/users.model';

interface UserCreateAttributes {
  roleId:string;
  userId:string;
}

@Table({tableName: 'user-roles', createdAt: false, updatedAt: false})
export class UserRoles extends Model<UserRoles,UserCreateAttributes>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ForeignKey(()=> Role)
  @Column({type: DataType.INTEGER})
  roleId:string

  @ForeignKey(()=> User)
  @Column({type: DataType.INTEGER})
  userId:string
}