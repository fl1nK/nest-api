import { Body, HttpStatus, Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { User } from '../users/users.model';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async login(userDto: CreateUserDto){
    const user = await this.validateUser(userDto)
    return this.generateToken(user)
  }

  async registration(userDto: CreateUserDto){
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if(candidate){
      throw new UnauthorizedException('User already exists');
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.usersService.createUser({...userDto, password: hashPassword});
    return this.generateToken(user)
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, roles: user.roles};
    return{
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(userDto: CreateUserDto) {
      const user = await this.usersService.getUserByEmail(userDto.email);
      const passwordEqual = await bcrypt.compare(userDto.password, user.password);
      if(user && passwordEqual){
        return user
      }
      throw new UnauthorizedException('Invalid email or password');
  }
}
