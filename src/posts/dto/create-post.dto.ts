import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePostDto {

  @ApiProperty({example: 'Title post', description: 'Post title'})
  readonly title: string;

  @ApiProperty({example: 'Content ', description: 'The content is written in the post'})
  readonly content: string;

  @ApiProperty({example: '3', description: 'ID of who created the post'})
  readonly userId: number;
}