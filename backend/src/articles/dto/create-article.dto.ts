export class CreateArticleDto {
    title: string;
    authors: string[];
    journal_name: string;
    publication_date: Date;
    volume: number;
    issue: number;
    pages: string;
    doi: string;
    method: string[];
    claim: string[];
    research_type: string[];
    participant_type: string[];
    summary: string[];
    support: string[];
    rating: string[];
}