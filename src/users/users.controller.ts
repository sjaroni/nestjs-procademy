import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Paginated } from 'src/common/pagination/pagination.interface';
import { User } from './user.entity';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public getUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQueryDto);
  }

  @Get(':id')
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  // @Post()
  // public createUser(@Body() user: CreateUserDto) {
  //   return this.usersService.createUser(user);
  // }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

}
