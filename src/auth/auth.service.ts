import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(@Inject(forwardRef(() => UsersService) ) private readonly usersService: UsersService) {}

  isAuthenticated: Boolean = false;

  login(email: string, password: string) {
    const user = this.usersService.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      return 'Invalid credentials';
    }
    this.isAuthenticated = true;
    return 'MY_TOKEN';
  }
}
