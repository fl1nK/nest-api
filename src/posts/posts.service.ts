import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsModule } from './posts.module';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesService } from '../files/files.service';

@Injectable()
export class PostsService {

  constructor(@InjectModel(Post) private postRepository: typeof Post, private fileService: FilesService) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image)
    const post = await this.postRepository.create({...dto, image: fileName});
    return post;
  }

  async getAllPosts() {
    const post = await this.postRepository.findAll();
    return post;
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }
  async deletePost(id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    await this.postRepository.destroy({ where: { id } });
    return { message: 'Post deleted successfully' };
  }

  async updatePost(id: number, dto: CreatePostDto, image?: any) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    if (image) {
      const fileName = await this.fileService.createFile(image);
      post.image = fileName;
    }

    post.title = dto.title;
    post.content = dto.content;

    await post.save();
    return post;
  }
}
