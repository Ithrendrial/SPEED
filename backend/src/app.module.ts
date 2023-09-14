import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article, ArticleSchema } from './article/schemas/article.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://matcris81:Lewandowski9@cluster0.d1cz2ne.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
