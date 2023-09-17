import { Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('signup')
  signup() {
    return { msg: 'Hello' };
  }

  @Post('signin')
  signin() {
    return 'I have signed in';
  }
}
