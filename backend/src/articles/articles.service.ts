import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { Article } from "./schema/articles.schema";
import { ArticlesRepository } from "./articles.repository";

@Injectable()
export class ArticlesService {
    constructor(private readonly articlesRepository: ArticlesRepository) {}

    // Get a specified user by id
    async getArticleById(articleId: string): Promise<Article> {
        return this.articlesRepository.findOne({ articleId })
    }

    // Get all the users
    async getArticles(): Promise<Article[]> {
        return this.articlesRepository.find({});
    }

    // Create a new article when given the title and authors
    async createArticle(title: string, authors: string[], journal_name: string, publication_date: Date, volume: number, issue: number, pages: string, doi: string): Promise<Article> {
        return this.articlesRepository.create({
            articleId: uuidv4(),
            title,
            authors: authors,
            journal_name: journal_name,
            publication_date: publication_date,
            volume: volume,
            issue: issue,
            pages: pages,
            doi: doi,
            moderator_status: 'unmoderated', // default value
            method: [],
            claim: [],
            research_type: "",
            participant_type: "",
            summary: [],
            support: ['neutral'], // default value
            publication_status: true
        })
    }

    // Finds a user by id and applies updates
    async updateArticle(articleId: string, articleUpdates: UpdateArticleDto): Promise<Article> {
        return this.articlesRepository.findOneAndUpdate({ articleId }, articleUpdates);
    }
}