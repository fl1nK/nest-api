import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { Role } from '../roles/roles.model';
import { UserRoles } from '../roles/user-roles.model';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '../auth/auth.module';
import { RolesService } from '../roles/roles.service';
import { PostModel } from '../posts/posts.model';
import { PostsService } from '../posts/posts.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports:[
    SequelizeModule.forFeature([User, Role, UserRoles, PostModel]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports:[
    UsersService
  ]
})
export class UsersModule {}
