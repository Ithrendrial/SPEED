import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schema/articles.schema';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    // Routes to interact with repository
    @Get(':articleId')
    async getArticle(@Param('articleId') articleId: string): Promise<Article> {
        return this.articlesService.getArticleById(articleId);
    }

    @Get()
    async getArticles(): Promise<Article[]> {
        return this.articlesService.getArticles();
    }

    @Post()
    async createArticle(
        @Body() createArticleDto: CreateArticleDto,
    ): Promise<Article> {
        return this.articlesService.createArticle(
            createArticleDto.title,
            createArticleDto.authors,
            createArticleDto.journal_name,
            createArticleDto.publication_date,
            createArticleDto.volume,
            createArticleDto.issue,
            createArticleDto.pages,
            createArticleDto.doi,
            createArticleDto.method,
            createArticleDto.claim,
            createArticleDto.research_type,
            createArticleDto.participant_type,
            createArticleDto.summary,
            createArticleDto.support,
            createArticleDto.rating,
        );
    }

    @Patch(':articleId')
    async updateArticle(
        @Param('articleId') articleId: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        return this.articlesService.updateArticle(articleId, updateArticleDto);
    }
}
