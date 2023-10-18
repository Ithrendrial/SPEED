import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ArticleDocument = Article & Document;
@Schema({ collection: 'Submissions' })
export class Article {

    @Prop()
    articleId: string;

    // Submission Information //

    @Prop()
    title: string;

    @Prop([String])
    authors: string[];

    @Prop()
    journal_name: string;

    @Prop()
    publication_date: Date;

    @Prop()
    volume: number;

    @Prop()
    issue: number;

    @Prop()
    pages: string;

    @Prop()
    doi: string;

    // Moderator Information //

    @Prop({
        type: String,
        enum: ['unmoderated', 'accepted', 'rejected'],
        default: 'unmoderated'
    })
    moderator_status: string;

    // Analyst Information //

    @Prop([String])
    method: string[];

    @Prop([String])
    claim: string[];

    @Prop([String])
    research_type: string[];

    @Prop([String])
    participant_type: string[];

    @Prop([String])
    summary: string[];

    @Prop({
        type: [String],
        enum: ['strong against', 'weak against', 'neutral', 'weak support', 'strong support'],
        default: 'neutral'
    })
    support: string[];

    @Prop([String])
    rating: string[];

    @Prop()
    publication_status: boolean;
}
export const ArticleSchema = SchemaFactory.createForClass(Article);
