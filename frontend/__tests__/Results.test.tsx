import {render, screen, waitFor} from '@testing-library/react'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Results from '@/app/results/page'

describe('Results page', () => {

    const mockAxios = new MockAdapter(axios);

    const sampleResponse = [
        {
            title: "Title",
            authors: ["Author Name 1", "Author Name 2", "Author Name 3"],
            journal_name: "Journal Name",
            publication_date: "2012-04-23T18:25:43.511+00:00",
            volume: 5,
            issue: 2,
            pages: "1-15",
            doi: "https://doi.org/10.1088/1367",
            moderator_status: "accepted",
            method: ["Test-Driven Development", "Test-Last Development"],
            claim: ["Code Quality Improvement", "Code Quality Improvement"],
            research_type: ["Survey", "Observation"],
            participant_type: ["Student", "Practitioner"],
            summary: ["Summary of first claim.", "Summary of second claim."],
            support: ["neutral", "weak against"],
            published_status: true,
            rating: [2,5]
        }
    ];

    mockAxios.onGet('http://localhost:3001/articles').reply(200, sampleResponse);


    it('should have "Result" title text', () => {
        render(<Results />)

        const titleElem = screen.getByText('SEARCH RESULTS')

        expect(titleElem).toBeInTheDocument()
    })

    it('should render the sample data title', async () => {
        render(<Results />);

        await waitFor(() => {
            for (const article of sampleResponse) {
                const articleTitleElem = screen.getByText(article.title);
                expect(articleTitleElem).toBeInTheDocument();
            }
        });
    });

    it('should render the sample data authors', async () => {
        render(<Results />);

        await waitFor(() => {
            for (const article of sampleResponse) {
                const articleAuthorsElem = screen.getByText(article.authors.join(', '));
                expect(articleAuthorsElem).toBeInTheDocument();
            }
        });
    });

    it('should render the sample data source if all information is present', async () => {
        render(<Results />);

        await waitFor(() => {
            for (const article of sampleResponse) {
                const expectedJournalInfo = `${article.journal_name}, Vol. ${article.volume}(${article.issue}), pg. ${article.pages}`;

                const articleSourceElem = screen.getByText(expectedJournalInfo);
                expect(articleSourceElem).toBeInTheDocument();
            }
        });
    });

    it('should render the sample data doi', async () => {
        render(<Results />);

        await waitFor(() => {
            for (const article of sampleResponse) {
                const articleDOIElem = screen.getByText(article.doi);
                expect(articleDOIElem).toBeInTheDocument();
            }
        });
    });
})