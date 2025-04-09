import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  login(email: string, password: string) {
    const user = this.usersService.users.find(
      (user) => user.email === email && user.password === password,
    );
    if (!user) {
      return 'Invalid credentials';
    }
    return 'MY_TOKEN';
  }
}
