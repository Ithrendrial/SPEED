import {
    Controller,
    Get,
    Post,
    Body,
    HttpCode,
    HttpStatus,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from '../services/auth.service';
import { Public } from '../declerations/routeDeclarations';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('authorize')
    signIn(@Body() userDto: UserDto) {
        console.log(userDto.username);
        return this.authService.signIn(userDto.username, userDto.password);
    }

    // @HttpCode(HttpStatus.OK)
    // @Post('login')
    // login(@Request() req) {
    //     return this.authService.login(req.user);
    // }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Get('all')
    findAll() {
        return 'this worked';
    }
}
