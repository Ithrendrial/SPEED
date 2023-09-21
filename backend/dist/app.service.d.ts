import { Model } from 'mongoose';
import { Article } from './article/schemas/article.schema';
export declare class AppService {
    private readonly articleModel;
    constructor(articleModel: Model<Article>);
    isDbConnected(): boolean;
    getHello(): string;
}
