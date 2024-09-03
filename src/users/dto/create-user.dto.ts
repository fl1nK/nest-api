import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({example: 'email@gmail.com', description: 'Email'})
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Must be a valid email address' })
  readonly email: string;

  @IsString({ message: 'Must be string' })
  @Length(4, 16, {message: 'Min 4 and max 16 characters'})
  @ApiProperty({example: '12345', description: 'Password'})
  readonly password: string;
}