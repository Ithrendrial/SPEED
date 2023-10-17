import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schema/articles.schema';
import { ArticlesRepository } from './articles.repository';

@Injectable()
export class ArticlesService {
    constructor(private readonly articlesRepository: ArticlesRepository) {}

    // Get a specified article by id
    async getArticleById(articleId: string): Promise<Article> {
        return this.articlesRepository.findOne({ articleId });
    }

    // Get all the articles
    async getArticles(): Promise<Article[]> {
        return this.articlesRepository.find({});
    }

    // Create a new article when given the title and authors
    async createArticle(title: string, authors: string[], journal_name: string, publication_date: Date, volume: number, issue: number, pages: string, doi: string, method: string[], claim: string[], research_type: string[], participant_type: string[], summary: string[], support: string[], rating: string[]): Promise<Article> {
        return this.articlesRepository.create({
            articleId: uuidv4(),
<<<<<<< HEAD
            title,
            authors: authors,
        });
    }

    // Finds a user by id and applies updates
    async updateArticle(
        articleId: string,
        articleUpdates: UpdateArticleDto,
    ): Promise<Article> {
        return this.articlesRepository.findOneAndUpdate(
            { articleId },
            articleUpdates,
        );
=======
            title: title,
            authors: authors,
            journal_name: journal_name,
            publication_date: publication_date,
            volume: volume,
            issue: issue,
            pages: pages,
            doi: doi,
            moderator_status: 'unmoderated', // default value
            method: method,
            claim: claim,
            research_type: research_type,
            participant_type: participant_type,
            summary: summary,
            support: support,
            publication_status: true,
            rating: rating
        })
    }

    // Finds an article by id and applies updates
    async updateArticle(articleId: string, articleUpdates: UpdateArticleDto): Promise<Article> {
        return this.articlesRepository.findOneAndUpdate({ articleId }, articleUpdates);
>>>>>>> main
    }
}
