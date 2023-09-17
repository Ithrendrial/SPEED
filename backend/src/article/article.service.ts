import { Injectable } from '@nestjs/common';

@Injectable({})
export class ArticleService {
  login() {
    return { msg: 'I have signed in' };
  }

  signup() {
    return { msg: 'I have signed up' };
  }
}
