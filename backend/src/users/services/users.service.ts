import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    // find specific user
    async validate(uname: string): Promise<User> {
        return this.userModel.findOne({ uname }).exec();
    }

    // create user
    async createUser(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async getAll() {
        return this.userModel.find().exec();
    }
}
