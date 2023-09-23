import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './articles/articles.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb+srv://nsx9698:useSPEEDN0w@articles.nldp3kq.mongodb.net/?retryWrites=true&w=majority'), ArticleModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}