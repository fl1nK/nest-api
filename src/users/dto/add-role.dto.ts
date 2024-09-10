import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({example: 'USER', description: 'Role name'})
  @IsString({message: 'Must be a string'})
  readonly value: string;

  @ApiProperty({example: '1', description: 'User ID'})
  @IsNumber({},{message: 'Must be a number'})
  readonly userId: number;
}