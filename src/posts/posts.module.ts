import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { PostModel } from './posts.model';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';
import { UsersService } from '../users/users.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports:[
    SequelizeModule.forFeature([User, PostModel]),
    FilesModule
  ],
  exports:[
    PostsService
  ]
})
export class PostsModule {}
