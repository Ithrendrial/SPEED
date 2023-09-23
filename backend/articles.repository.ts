import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { Article, ArticleDocument } from "./schemas/articles.schema";

@Injectable()
export class ArticlesRepository {
    constructor(@InjectModel(Article.name) private articleModel: Model<ArticleDocument>) {}

    // Get one article
    async findOne(articleFilterQuery: FilterQuery<Article>): Promise<Article> {
        return this.articleModel.findOne(articleFilterQuery);
    }

    // Get multiple articles
    async find(articlesFilterQuery: FilterQuery<Article>): Promise<Article[]> {
        return this.articleModel.find(articlesFilterQuery)
    }

    // Create a new article
    async create(article: Article): Promise<Article> {
        const newArticle = new this.articleModel(article);
        return newArticle.save()
    }

    // Update an existing article, returns updated user
    async findOneAndUpdate(articleFilterQuery: FilterQuery<Article>, article: Partial<Article>): Promise<Article> {
        return this.articleModel.findOneAndUpdate(articleFilterQuery, article, { new: true });
    }
}