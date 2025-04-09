import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

  constructor(@Inject(forwardRef(() => AuthService) ) private readonly authService: AuthService) {}

  users: {
    id: number;
    name: string;
    gender: string;
    email: string;
    isMarried: boolean;
    password: string;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      email: 'john@gmx.com',
      isMarried: false,
      password: 'test1234'
    },
    {
      id: 2,
      name: 'Sarah Park',
      gender: 'female',
      email: 'sarah@gmx.com',
      isMarried: false,
      password: 'test1234'
    },
    {
      id: 3,
      name: 'Harry Potter',
      gender: 'male',
      email: 'harry@gmx.com',
      isMarried: true,
      password: 'test1234'
    },
  ];

  getAllUsers() {
    if(this.authService.isAuthenticated) {    
      return this.users;
    }
    return 'Unauthorized';
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    gender: string;
    email: string;
    isMarried: boolean;
    password: string
  }) {
    this.users.push(user);
    return user;
  }
}
