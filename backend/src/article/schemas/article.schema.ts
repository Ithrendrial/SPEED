import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ArticleDocument = HydratedDocument<Article>;

@Schema()
export class Article {
  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  journalName: string;

  @Prop()
  publicationYear: number;

  @Prop()
  volume: number;

  @Prop()
  pages: number;

  @Prop()
  DOI: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
