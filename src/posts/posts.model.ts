import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { User } from '../users/users.model';

interface PostCreateAttributes {
  title:string;
  content:string;
  userId:number
  image:string
}

@Table({tableName: 'posts'})
export class PostModel extends Model<PostModel,PostCreateAttributes>{
  @ApiProperty({example: '1', description: 'Post ID'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'Title', description: 'Post title'})
  @Column({type: DataType.STRING, allowNull: false})
  title:string

  @ApiProperty({example: 'Example test', description: 'Content'})
  @Column({type: DataType.STRING, allowNull: false})
  content:string

  @ApiProperty({example: 'c373e920-be27-458a-97ff-8ccbf04cb775.jpg', description: 'Image URL'})
  @Column({type: DataType.STRING})
  image:string

  @ApiProperty({example: '2', description: 'User ID'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER})
  userId:number

  @BelongsTo(() => User)
  author: User
}