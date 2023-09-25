import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './articles/articles.module';
import { AuthModule } from './auth/modules/auth.module';
import { UsersModule } from './users/modules/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nsx9698:useSPEEDN0w@articles.nldp3kq.mongodb.net/?retryWrites=true&w=majority',
    ),
    ArticleModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
