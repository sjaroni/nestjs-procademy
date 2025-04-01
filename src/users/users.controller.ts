import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    const usersService = new UsersService();
    return usersService.getAllUsers();
  }

  // alle ausgeben
  // @Get(':id/:name/:gender')
  // xgetUserById(
  //   @Param() param: any) {
  //     console.log(param);      
  // }

  // @Get(':id/:name/:gender')
  // getUserById(
  //   @Param('id') id: string,
  //   @Param('name') name: string,
  //   @Param('gender') gender?: string,
  // ) {
  //   return { id, name, gender: gender || 'unknown' };
  // }

  @Get(':id')
  getUserById(@Param('id') id: any) {
    const usersService = new UsersService();
    return usersService.getUserById(+id);
  }

  @Post()
  createUser() {
    const user = {
      id: 4,
      name: 'Ron Weasley',
      age: 22,
      gender: 'male',
      isMarried: false,
    };
    const usersService = new UsersService();
    usersService.createUser(user);
    return 'A new user has been created';
  }
}
