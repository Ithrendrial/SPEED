"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {createTheme, ThemeProvider } from '@mui/material';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import style from "../../styles/ResultsPage.module.css";

interface Article {
    articleId: string;
    title: string;
    authors: string[];
    journal_name: string;
    publication_date: string;
    volume: number;
    issue: number;
    pages: string;
    doi: string;
    method: string[];
    claim: string[];
    research_type:string[],
    participant_type: string[];
    summary: string[];
    support: string[];
    rating: number[];
    publication_status: boolean;
}

function Results() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [selectedClaim, setSelectedClaim] = useState<string>('');
    let claimIndex = 0;

    useEffect(() => {
        // Parse the query parameters from the URL
        const queryParams = new URLSearchParams(window.location.search);
        const method = queryParams.get('method');
        const claim = queryParams.get('claim');

        setSelectedMethod(method || '');
        setSelectedClaim(claim || '');
    }, []);


    function formatDate(dateString: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const filteredArticles = useMemo(() => {
        if (!selectedClaim) {
            // If no claim is selected, return all articles
            return articles;
        }

        // Add articles containing the claim into filteredArticles array to add to the table data
        return articles.filter((article) => article.claim.includes(selectedClaim));
    }, [articles, selectedClaim]);


    const data = filteredArticles.map((article) => {
        claimIndex = article.claim.indexOf(selectedClaim); // Find the index of selectedClaim in the claim array
        const source =
            (article.journal_name ? `${article.journal_name}` : '') +
            (article.volume ? (article.journal_name ? ', ' : '') + `Vol. ${article.volume}` : '') +
            (article.issue && article.volume ? `(${article.issue}` : '') +
            (article.issue && article.volume && article.pages ? `), pg. ${article.pages}` : '');

        return {
            title: article.title,
            authors: article.authors.join(', '),
            source: source,
            publication_date: formatDate(article.publication_date),
            doi: article.doi,
            claim: selectedClaim, // Use the selected claim
            research_type: claimIndex !== -1 ? article.research_type[claimIndex] : '', // Use the corresponding index if found
            participant_type: claimIndex !== -1 ? article.participant_type[claimIndex] : '', // Use the corresponding index if found
            support: claimIndex !== -1 ? article.support[claimIndex] : '', // Use the corresponding index if found
            summary: article.summary,
            rating: claimIndex !== -1 && article.rating && article.rating[claimIndex] ? <div className={ style.rating }><StarRatings rating={ article.rating[claimIndex] } starDimension="1.2rem" starSpacing="0.1rem" starRatedColor="rgb(238, 198, 31)"/></div> : <StarRatings rating={ 0 } starDimension="1.2rem" starSpacing="0.1rem"/>
        };
    });

        const columns = useMemo(() => [
                {
                    accessorKey: 'title',
                    header: 'Title',
                    size: 200,
                    muiTableBodyCellProps: {
                        sx: {
                            textAlign: 'left',
                        }
                    },
                },
                {
                    accessorKey: 'authors',
                    header: 'Authors',
                    size: 150,
                    muiTableBodyCellProps: {
                        sx: {
                            textAlign: 'left',
                        }
                    },
                },
                {
                    accessorKey: 'source',
                    header: 'Source',
                    size: 200,
                },
                {
                    accessorKey: 'publication_date',
                    header: 'Publication Date',
                    size: 50
                },
                {
                    accessorKey: 'doi',
                    header: 'DOI',
                    size: 250,
                },
                {
                    accessorKey: 'claim',
                    header: 'Claim',
                    size: 150,
                },
                {
                    accessorKey: 'research_type',
                    header: 'Research Type',
                    size: 200
                },
                {
                    accessorKey: 'participant_type',
                    header: 'Participant Type',
                    size: 200
                },
                {
                    accessorKey: 'support',
                    header: 'Evidence',
                    size: 150,

                },
                {
                    accessorKey: 'rating',
                    header: 'Rating',
                    size: 150,
                },
            ],
            [],
        );

    useEffect(() => {
        axios
            .get<Article[]>('https://speed-backend-seven.vercel.app/articles')
            .then((res) => {
                setArticles(res.data);
            })
            .catch(() => {
                console.log('Error from Results');
            });
    }, []);

    const tableTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    background: {
                        default: '#E5E7DE',
                    },
                },
                components: {
                    MuiSwitch: {
                        styleOverrides: {
                            switchBase: {
                                color: "#334C1F",
                                "&.Mui-checked": {
                                    color: "#6E8C30"
                                },
                                "&.Mui-checked.Mui-disabled": {
                                    color: "#6E8C30",
                                    opacity: '0.2'
                                },

                                "&.Mui-checked+.MuiSwitch-track": {
                                    backgroundColor: '#6E8C30',
                                },
                            },

                            track: {
                                backgroundColor: '#1b3600',
                            }
                        }
                    },
                    MuiButton: {
                        styleOverrides: {
                            textPrimary: {
                                color: "#334C1F"
                            }
                        }
                    },
                    MuiSvgIcon: {
                        styleOverrides: {
                               root: {
                                   color: "#334C1F"
                               }
                        }
                    },
                    MuiTypography: {
                        styleOverrides: {
                            body1: {
                                "&.Mui-disabled": {
                                    opacity: '0.5'
                                },
                            }
                        }
                    }
                }
            }),
        [],
    );

    return (
        <div className={ style.page }>
        <div className="heading">SEARCH RESULTS</div>
        <div className={ style.search_info }> "{ selectedMethod } - { selectedClaim }" </div>
            <ThemeProvider theme={ tableTheme }>
            <MaterialReactTable
                                columns={ columns }
                                data={ data }
                                enableDensityToggle={ false }
                                enableTableFooter={ false }
                                enableFullScreenToggle={ false }
                                enableGlobalFilter={ false }
                                enableExpandAll={ false }
                                paginateExpandedRows={ false }
                                enableColumnActions={ false }
                                enableSorting={ false }
                                enablePagination={ false }

                                muiTableHeadCellProps={{
                                    sx: {
                                        "& .Mui-TableHeadCell-Content": {
                                            display: 'flex',
                                            justifyContent: 'center',
                                            fontFamily: 'LexendExa-SemiBold, sans-serif',
                                            color: '#334C1F',
                                            letterSpacing: 'min(0.1vw, 0.2vh)',
                                            fontWeight: '700',
                                            fontSize: '1rem',
                                            alignText: 'center',
                                            height: 'min(10vw, 4vh)',
                                        },
                                    },
                                }}

                                muiTableBodyCellProps={{
                                    sx: {
                                        textAlign: 'center',
                                    }
                                }}

                                displayColumnDefOptions={{
                                    'mrt-row-expand': {
                                        muiTableHeadCellProps: {
                                            sx: {
                                                color: '#E5E7DE',
                                                fontSize: '0.1px'
                                            }
                                        },
                                    },

                                }}

                                muiTablePaperProps={{
                                    elevation: 0,
                                    sx: {
                                        height: "70vh",
                                        margin: "0",
                                        background: '#E5E7DE',
                                    },
                                }}

                                muiTableDetailPanelProps={{
                                    sx: {
                                        background: '#E5E7DE',
                                    },
                                }}

                                renderDetailPanel={({ row }) => (
                                    <div className={style.details}>
                                        <div className={style.subheading}>Summary </div>
                                        <div className={style.content}>{row.original.summary[claimIndex]}</div>
                                    </div>
                                )}
                                ></MaterialReactTable>
            </ThemeProvider>
        </div>
    );
}

export default Results;