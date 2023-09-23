import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArticleDocument = Article & Document;
@Schema({collection: 'Submissions'})
export class Article {
    @Prop()
    articleId: string;

    @Prop()
    title: string;

    @Prop([String])
    authors: string[];
}
export const ArticleSchema = SchemaFactory.createForClass(Article)