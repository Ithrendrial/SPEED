import { ArticleService } from './article.service';
export declare class ArticleController {
    private articleService;
    constructor(articleService: ArticleService);
    signup(): {
        msg: string;
    };
    signin(): string;
}
