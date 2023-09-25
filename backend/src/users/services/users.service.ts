import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    console.log(username, email, password);
    return username;
  }
}
