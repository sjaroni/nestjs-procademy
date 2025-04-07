import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersQueryDto } from './dtos/get-user-query.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: GetUsersQueryDto) {
    console.log(query);
    return this.usersService.getAllUsers();
  }

  //   @Get('/users/:isMarried')
  //  // getUsers(@Query() query: any) {
  //   getUsers(
  //     @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  //     @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //     // @Query('isMarried', ParseBoolPipe) isMarried: boolean,
  //     @Param() param: GetUserParamDto,
  //   ) {
  //     console.log(param);

  //     // getUsers(@Query('gender') query: any) {
  //     // console.log(query);
  //     // console.log(query.gender);
  //     // if(query.gender){
  //     //   return this.usersService.getAllUsers().filter(user => user.gender === query.gender)
  //     // }

  //     // console.log(limit, page);

  //     return this.usersService.getAllUsers();
  //   }

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
  // createUser(@Body(new ValidationPipe()) user: CreateUserDto) { // <- Validierung in main.ts ausgelagert!
  createUser(@Body() user: CreateUserDto) {
    // console.log(user);
    // console.log(typeof user); <-- Object
    console.log(user instanceof CreateUserDto);
    // this.usersService.createUser(user);
    return 'A new user has been created';
  }

  @Patch()
  updateUser(@Body() user: UpdateUserDto) {
    console.log(user);
    return 'A user has been updated';
  }
}
