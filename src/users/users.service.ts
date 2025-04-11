import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  getAllUsers() {
    return this.userRepository.find();
  }

  public async createUser(userDto: CreateUserDto) {
    // validate if a user exists with the given email
    const user = await this.userRepository.findOne({ 
      where: { email: userDto.email } 
    });
    // handle the error / exception
    if(user) {
      return 'The user with the given email already exists';
    }
    // create a new user
    let newUser = this.userRepository.create(userDto);
    // save the user to the database
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}
