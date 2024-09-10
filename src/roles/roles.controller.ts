import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { Role } from './roles.model';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({status: 201, type: Role})
  @Post()
  create(@Body() gto: CreateRoleDto) {
    return this.rolesService.createRole(gto);
  }

  @ApiOperation({ summary: 'Get role by value' })
  @ApiResponse({status: 200, type: Role})
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value)
  }

}
