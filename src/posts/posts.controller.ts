import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostModel } from './posts.model';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({status: 201, type: PostModel})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createPost(@Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postsService.create(dto, image);
  }

  @ApiOperation({ summary: 'Get all post' })
  @ApiResponse({status: 200, type: [PostModel]})
  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiOperation({ summary: 'Get one post by id' })
  @ApiResponse({status: 200, type: PostModel})
  @Post('/:id')
  getPostById(@Param('id') id: number) {
    return this.postsService.getPostById(id);
  }

  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({status: 200, description: 'Post deleted successfully'})
  @Delete('/:id')
  deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }

  @ApiOperation({ summary: 'Update post by id' })
  @ApiResponse({status: 201, type: PostModel})
  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  updatePost(@Param('id') id: number, @Body() dto: CreatePostDto, @UploadedFile() image: any) {
    return this.postsService.updatePost(id, dto, image);
  }
}
