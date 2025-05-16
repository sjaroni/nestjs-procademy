import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { Profile } from 'src/profile/profile.entity';
import { table } from 'console';
import { UserAlreadyExistsException } from 'src/customExceptions/user-already-exists.exception';
// import { ConfigService } from '@nestjs/config';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/pagination.interface';
import { PaginationQueryDto } from '../common/pagination/dto/pagination-query.dto';
import { HashingProvider } from 'src/auth/provider/hashing.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    // private readonly configService: ConfigService,
    private readonly paginationProvider: PaginationProvider<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async getAllUsers(
    paginationQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    // const environment = this.configService.get<string>('ENV_MODE');
    // const environment = process.env.NODE_ENV;
    // console.log('Environment:', environment);

    try {
      return await this.paginationProvider.paginateQuery(
        paginationQueryDto,
        this.userRepository,
        undefined,
        ['profile'],
      );

      // return await this.userRepository.find({
      //   relations: {
      //     profile: true,
      //   },
      // });
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
      const existingUserWithUsername = await this.userRepository.findOne({
        where: [{ username: userDto.username }],
      });

      if (existingUserWithUsername) {
        throw new UserAlreadyExistsException('username', userDto.username);
      }

      // Check if user with same username or email already exists
      const existingUserWithEmail = await this.userRepository.findOne({
        where: [{ email: userDto.email }],
      });

      if (existingUserWithEmail) {
        throw new UserAlreadyExistsException('email', userDto.email);
      }

      // Create User Object
      let user = this.userRepository.create({
        ...userDto,
        password: await this.hashingProvider.hashPassword(userDto.password),
      });

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

  public async findUserByUsername(username: string) {
    let user: User | null = null;

    try {
      user = await this.userRepository.findOneBy({ username });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'User with given username could not be found!s',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist!');
    }

    return user;
  }
}
