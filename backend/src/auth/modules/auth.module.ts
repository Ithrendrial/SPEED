import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersModule } from '../../users/modules/users.module';
import { jwtConstants } from '../../constants/constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
            provide: 'APP_GUARD',
            useClass: AuthGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule {}
