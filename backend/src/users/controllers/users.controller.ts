import {
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Body,
    Get,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersService } from '../services/users.service';
import { Public } from '../../declerations/routeDeclarations';
import { User } from '../schema/user.schema';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto.radioOption);
        return this.usersService.createUser(createUserDto);
    }

    @Public()
    @Get('all')
    findAll(): Promise<User[]> {
        return this.usersService.getAll();
    }
}
