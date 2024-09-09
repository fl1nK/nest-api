import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postsService.create(dto, image);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Post('/:id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @Delete('/:id')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(@Param('id') id: number, @Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postsService.updatePost(id, dto, image);
  }
}
