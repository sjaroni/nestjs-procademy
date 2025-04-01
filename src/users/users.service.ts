import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  users: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }[] = [
    {
      id: 1,
      name: 'John Doe',
      age: 30,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'Mrs. J',
      age: 25,
      gender: 'female',
      isMarried: false,
    },
    {
      id: 3,
      name: 'Harry Potter',
      age: 25,
      gender: 'male',
      isMarried: true,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(user: {
    id: number;
    name: string;
    age: number;
    gender: string;
    isMarried: boolean;
  }) {
    this.users.push(user);
    return user;
  }
}
