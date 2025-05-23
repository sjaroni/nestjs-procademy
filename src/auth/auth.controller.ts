import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AllowAnonymous } from './decorators/allow-anonymous.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //http://localhost:3000/auth/login
  @AllowAnonymous()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  
  //http://localhost:3000/auth/signup
  @AllowAnonymous()
  @Post('signup')
  public async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
}
