import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./schema/articles.schema";
import { ArticlesController } from "./articles.controller";
import { ArticlesRepository } from "./articles.repository";
import { ArticlesService } from "./articles.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])],
    controllers: [ArticlesController],
    providers: [ArticlesService, ArticlesRepository]
})
export class ArticleModule {}