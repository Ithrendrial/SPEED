"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material';
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
    publication_status: boolean;
}

function Results() {
    const [articles, setArticles] = useState<Article[]>([]);

    const data = articles.map((article) => ({
        title: article.title,
        authors: article.authors.join(', '),
        summary: article.summary
    }));

        const columns = useMemo(() => [
                {
                    accessorKey: 'title',
                    header: 'Title',
                    size: 200
                },
                {
                    accessorKey: 'authors',
                    header: 'Authors',
                    size: 150
                },
                {
                    accessorKey: 'source',
                    header: 'Source',
                    size: 200
                },
                {
                    accessorKey: 'publication_date',
                    header: 'Publication Date',
                    size: 50
                },
                {
                    accessorKey: 'doi',
                    header: 'DOI',
                    size: 250
                },
                {
                    accessorKey: 'claim',
                    header: 'Claim',
                    size: 150
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
                    size: 150
                },
                {
                    accessorKey: 'rating',
                    header: 'Rating',
                    size: 100
                },
            ],
            [],
        );

    useEffect(() => {
        axios
            .get<Article[]>('http://localhost:3001/articles')
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
            }),
        [],
    );

    return (
        <div className={ style.page }>
        <div className="heading"> SEARCH RESULTS </div>
        <div className={ style.search_info }> "Placeholder method - placeholder claim" </div>
            <ThemeProvider theme={tableTheme}>
            <MaterialReactTable columns={ columns }
                                data={ data }
                                enableDensityToggle={ false }
                                enableTableFooter={ false }
                                enableFullScreenToggle={ false }
                                enableGlobalFilter={ false }
                                enableExpandAll={ false }
                                paginateExpandedRows={ false }
                                enableColumnActions={ false }
                                enableSorting={ false }

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
                                            alignText: 'center'
                                        },
                                    },
                                }}

                                muiBottomToolbarProps={{
                                    sx: {
                                        position: 'absolute',
                                        bottom: '0',
                                        background: '#eff1ea'
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
                                        <div className={style.content}>{row.original.summary[0]}</div>
                                    </div>
                                )} />
            </ThemeProvider>
        </div>
    );
}

export default Results;