import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    //@Inject(forwardRef(() => UsersService)) // nach Umstellung auf Authentifizierung keine Circular Dependency Injection mehr nötig
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  isAuthenticated: Boolean = false;

  login(email: string, password: string) {
    console.log(this.authConfiguration);
    
    return 'Invalid credentials';
  }

  signup(createUserDto: CreateUserDto){
    return this.usersService.createUser(createUserDto);
  }

}
