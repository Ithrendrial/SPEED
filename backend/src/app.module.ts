import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { Article, ArticleSchema } from './article/schemas/article.schema';
import { ArticleModule } from './article/article.module';
import * as dotenv from 'dotenv';

@Module({
  imports: [
    ArticleModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://matcris81:Lewandowski9@cluster0.d1cz2ne.mongodb.net/?retryWrites=true&w=majority',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
// [MongooseModule.forRoot('mongodb+srv://matcris81:Lewandowski9@cluster0.d1cz2ne.mongodb.net/?retryWrites=true&w=majority',)],
