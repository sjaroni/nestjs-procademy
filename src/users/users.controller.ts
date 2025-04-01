import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    const usersService = new UsersService();
    return usersService.getAllUsers();
  }

  @Get(':id')
  // @Param('id') id: number
  getUserById(@Param('id') id: number) {
    const usersService = new UsersService();
    return usersService.getUserById(id);
  }

  @Post()
  createUser(){
    const user = {
      id: 4,
      name: 'Ron Weasley',      
      age: 22,
      gender: 'male',
      isMarried: false
    }
    const usersService = new UsersService();
    usersService.createUser(user);
    return 'A new user has been created';
  }
}
