import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schema/articles.schema';
import { ArticlesService } from './articles.service';
import { Public } from '../declerations/routeDeclarations';
// import { async } from 'rxjs';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    // Routes to interact with repository, validation should be added here later
    @Get(':articleId')
    async getArticle(@Param('articleId') articleId: string): Promise<Article> {
        return this.articlesService.getArticleById(articleId);
    }

    @Public()
    @Get()
    async getArticles(): Promise<Article[]> {
        return this.articlesService.getArticles();
    }

    @Public()
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

    @Public()
    @Patch(':articleId')
    async updateArticle(
        @Param('articleId') articleId: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        console.log('updateArticleDto: ', updateArticleDto);
        return this.articlesService.updateArticle(articleId, updateArticleDto);
    }

    @Public()
    @Get('/retrieve/unpublished')
    async getUnpublishedArticles(): Promise<Article[]> {
        return this.articlesService.getUnpublishedArticles();
    }

    @Public()
    @Get('/retrieve/unmoderated')
    async getFilteredArticles(
        @Query('moderator_status') moderator_status: string,
    ): Promise<Article[]> {
        console.log('moderator_status: ', moderator_status);
        return this.articlesService.getFilteredArticles(moderator_status);
    }
}
