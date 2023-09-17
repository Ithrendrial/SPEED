import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleSchema } from './article/schemas/article.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Article.name) private readonly articleModel: Model<Article>,
  ) {}

  isDbConnected(): boolean {
    // Check the Mongoose connection status
    return this.articleModel.db.readyState === 1;
  }
  getHello(): string {
    return 'Hello World!';
  }
}
