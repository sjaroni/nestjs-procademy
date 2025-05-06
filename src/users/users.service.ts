import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import { table } from 'console';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,

    // private readonly configService: ConfigService,
  ) {}

  public async getAllUsers() {
    // const environment = this.configService.get<string>('ENV_MODE');
    // const environment = process.env.NODE_ENV;
    // console.log('Environment:', environment);

    try {
      return await this.userRepository.find({
        relations: {
          profile: true,
        },
      });
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has accurred. Please try again',
          {
            description: 'Could not connect to the database',
            cause: error,
          },
        );
      }
      throw error;
    }
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      // Create a Profile & Save
      userDto.profile = userDto.profile ?? {};

      // Check if user with same username or email already exists
      const existingUser = await this.userRepository.findOne({
        where: [{ username: userDto.username }, { email: userDto.email }],
      });

      if (existingUser) {
        throw new BadRequestException(
          'There is already a user with this username or email',
        );
      }

      // Create User Object
      let user = this.userRepository.create(userDto);

      // Save the user object
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new RequestTimeoutException(
          'An error has accurred. Please try again',
          {
            description: 'Could not connect to the database',
            cause: error,
          },
        );
      }

      throw error;

      // Überprüfung wurde in den Try-Block verschoben
      // if (error.code === 'ECONNREFUSED') {
      //   throw new RequestTimeoutException(
      //     'An error has accurred. Please try again',
      //     {
      //       description: 'Could not connect to the database',
      //       cause: error,
      //     },
      //   );
      // }
    }
  }

  public async deleteUser(id: number) {
    //Delete user
    await this.userRepository.delete(id);

    //Send a response
    return { deleted: true };
  }

  public async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `The user with the id ${id} was not found`,
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
        {
          // 3rd optional argument is optional
          // not send back to the client
          // used for logging in database or logfile
          // helfpul for debugging
          // can include sensitive information
          description: `The exception occured because a user with the id ${id} was not found in user table`,
        },
      );
    }

    return user;
  }
}
