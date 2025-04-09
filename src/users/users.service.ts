import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
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
    return this.users;
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
