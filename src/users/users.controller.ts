import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('users')
// @UseGuards(AuthorizeGuard) // all endpoints in this controller will be protected by the AuthorizeGuard
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @UseGuards(AuthorizeGuard) // specific endpoint
  @Get()
  public getUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.usersService.getAllUsers(paginationQueryDto);
  }

  // @UseGuards(AuthorizeGuard)
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
