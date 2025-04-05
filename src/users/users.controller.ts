import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  @Get()
  // getUsers(@Query() query: any) {
  getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    // getUsers(@Query('gender') query: any) {
    // console.log(query);
    // console.log(query.gender);
    // if(query.gender){
    //   return this.usersService.getAllUsers().filter(user => user.gender === query.gender)
    // }

    console.log(limit, page);

    return this.usersService.getAllUsers();
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
  getUserById(@Param('id', ParseIntPipe) id: number) {
    // console.log(typeof id, id); // zu Nummer konvertiert
    return this.usersService.getUserById(id);
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
    this.usersService.createUser(user);
    return 'A new user has been created';
  }
}
