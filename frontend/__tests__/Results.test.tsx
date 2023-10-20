// import { render, screen } from "@testing-library/react";
// import Results from "@/app/results/page";
// import "@testing-library/jest-dom/extend-expect"; // add this import
// import fetch from "node-fetch";
//
// (global as any).fetch = fetch;
//
// // import { describe, it, expect } from "@jest/globals";
//
// describe("Results component", () => {
//   it('should render the heading "SEARCH RESULTS"', () => {
//     render(<Results />);
//   });
//
//   it("should render the search info with the selected method and claim", () => {
//     const method = "Test Method";
//     const claim = "Test Claim";
//     render(<Results />);
//     const searchInfo = screen.getByText(`"${method} - ${claim}"`);
//     expect(searchInfo).toBeInTheDocument();
//   });
//
//   it("should render a table with the appropriate columns", () => {
//     render(<Results />);
//     const titleColumn = screen.getByText("Title");
//     const authorsColumn = screen.getByText("Authors");
//     const sourceColumn = screen.getByText("Source");
//     const publicationDateColumn = screen.getByText("Publication Date");
//     const doiColumn = screen.getByText("DOI");
//     const claimColumn = screen.getByText("Claim");
//     const researchTypeColumn = screen.getByText("Research Type");
//     const participantTypeColumn = screen.getByText("Participant Type");
//     const evidenceColumn = screen.getByText("Evidence");
//     const ratingColumn = screen.getByText("Rating");
//     expect(titleColumn).toBeInTheDocument();
//     expect(authorsColumn).toBeInTheDocument();
//     expect(sourceColumn).toBeInTheDocument();
//     expect(publicationDateColumn).toBeInTheDocument();
//     expect(doiColumn).toBeInTheDocument();
//     expect(claimColumn).toBeInTheDocument();
//     expect(researchTypeColumn).toBeInTheDocument();
//     expect(participantTypeColumn).toBeInTheDocument();
//     expect(evidenceColumn).toBeInTheDocument();
//     expect(ratingColumn).toBeInTheDocument();
//   });
//
//   it("should render the table data with the appropriate values, including evidence", () => {
//     const mockArticles = [
//       {
//         articleId: "1",
//         title: "Test Title 1",
//         authors: ["Author 1", "Author 2"],
//         journal_name: "Test Journal",
//         publication_date: "2022-01-01",
//         volume: 1,
//         issue: 1,
//         pages: "1-10",
//         doi: "doi:1234",
//         method: ["Test Method"],
//         claim: ["Test Claim"],
//         research_type: ["Test Research Type"],
//         participant_type: ["Test Participant Type"],
//         summary: ["Test Summary"],
//         support: ["Test Evidence"],
//         rating: ["1,2,3"],
//         publication_status: true,
//       },
//       {
//         articleId: "2",
//         title: "Test Title 2",
//         authors: ["Author 3", "Author 4"],
//         journal_name: "Test Journal 2",
//         publication_date: "2022-02-02",
//         volume: 2,
//         issue: 2,
//         pages: "20-30",
//         doi: "doi:5678",
//         method: ["Test Method 2"],
//         claim: ["Test Claim 2"],
//         research_type: ["Test Research Type 2"],
//         participant_type: ["Test Participant Type 2"],
//         summary: ["Test Summary 2"],
//         support: ["Test Evidence 2"],
//         rating: ["4,5"],
//         publication_status: true,
//       },
//     ];
//     jest.spyOn(global, "fetch").mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce(mockArticles),
//     } as any);
//     render(<Results />);
//     const evidence1 = screen.getByText("Test Evidence");
//     const evidence2 = screen.getByText("Test Evidence 2");
//     expect(evidence1).toBeInTheDocument();
//     expect(evidence2).toBeInTheDocument();
//   });
//
//   it("should render the table data with the appropriate values", async () => {
//     const mockArticles = [
//       {
//         articleId: "1",
//         title: "Test Title 1",
//         authors: ["Author 1", "Author 2"],
//         journal_name: "Test Journal",
//         publication_date: "2022-01-01",
//         volume: 1,
//         issue: 1,
//         pages: "1-10",
//         doi: "doi:1234",
//         method: ["Test Method"],
//         claim: ["Test Claim"],
//         research_type: ["Test Research Type"],
//         participant_type: ["Test Participant Type"],
//         summary: ["Test Summary"],
//         support: ["Test Evidence"],
//         rating: ["1,2,3"],
//         publication_status: true,
//       },
//       {
//         articleId: "2",
//         title: "Test Title 2",
//         authors: ["Author 3", "Author 4"],
//         journal_name: "Test Journal 2",
//         publication_date: "2022-02-02",
//         volume: 2,
//         issue: 2,
//         pages: "20-30",
//         doi: "doi:5678",
//         method: ["Test Method 2"],
//         claim: ["Test Claim 2"],
//         research_type: ["Test Research Type 2"],
//         participant_type: ["Test Participant Type 2"],
//         summary: ["Test Summary 2"],
//         support: ["Test Evidence 2"],
//         rating: ["4,5"],
//         publication_status: true,
//       },
//     ];
//     jest.spyOn(global, "fetch").mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce(mockArticles),
//     } as any);
//     render(<Results />);
//     const title1 = screen.getByText("Test Title 1");
//     const authors1 = screen.getByText("Author 1, Author 2");
//     const source1 = screen.getByText("Test Journal, Vol. 1(1), pg. 1-10");
//     const publicationDate1 = screen.getByText("January 1, 2022");
//     const doi1 = screen.getByText("doi:1234");
//     const claim1 = screen.getByText("Test Claim");
//     const researchType1 = screen.getByText("Test Research Type");
//     const participantType1 = screen.getByText("Test Participant Type");
//     const evidence1 = screen.getByText("Test Evidence");
//     const rating1 = screen.getByTestId("rating-0");
//     const title2 = screen.getByText("Test Title 2");
//     const authors2 = screen.getByText("Author 3, Author 4");
//     const source2 = screen.getByText("Test Journal 2, Vol. 2(2), pg. 20-30");
//     const publicationDate2 = screen.getByText("February 2, 2022");
//     const doi2 = screen.getByText("doi:5678");
//     const claim2 = screen.getByText("Test Claim 2");
//     const researchType2 = screen.getByText("Test Research Type 2");
//     const participantType2 = screen.getByText("Test Participant Type 2");
//     const evidence2 = screen.getByText("Test Evidence 2");
//     const rating2 = screen.getByTestId("rating-1");
//     expect(title1).toBeInTheDocument();
//     expect(authors1).toBeInTheDocument();
//     expect(source1).toBeInTheDocument();
//     expect(publicationDate1).toBeInTheDocument();
//     expect(doi1).toBeInTheDocument();
//     expect(claim1).toBeInTheDocument();
//     expect(researchType1).toBeInTheDocument();
//     expect(participantType1).toBeInTheDocument();
//     expect(evidence1).toBeInTheDocument();
//     expect(rating1).toBeInTheDocument();
//     expect(title2).toBeInTheDocument();
//     expect(authors2).toBeInTheDocument();
//     expect(source2).toBeInTheDocument();
//     expect(publicationDate2).toBeInTheDocument();
//     expect(doi2).toBeInTheDocument();
//     expect(claim2).toBeInTheDocument();
//     expect(researchType2).toBeInTheDocument();
//     expect(participantType2).toBeInTheDocument();
//     expect(evidence2).toBeInTheDocument();
//     expect(rating2).toBeInTheDocument();
//   });
// });
