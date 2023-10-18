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
import { AuthService } from '../services/auth.service';
import { Public } from '../../declerations/routeDeclarations';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserDto } from '../../users/dtos/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('authorize')
    authorize(@Body() userDto: UserDto) {
        return this.authService.authorize(
            userDto.uname,
            userDto.password,
            userDto.radioOption,
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        const username = req.user.username;
        // const user = this.authService.getUserDetails(username);
        return this.authService.getUserDetails(username);
    }
}
