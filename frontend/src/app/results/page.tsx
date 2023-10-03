"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Paper } from '@mui/material';
import { IconButton } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';
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
                },
                {
                    accessorKey: 'authors',
                    header: 'Authors',
                },
                {
                    accessorKey: 'source',
                    header: 'Source',
                },
                {
                    accessorKey: 'publication_date',
                    header: 'Publication Date',
                },
                {
                    accessorKey: 'doi',
                    header: 'DOI',
                },
                {
                    accessorKey: 'claim',
                    header: 'Claim',
                },
                {
                    accessorKey: 'research_type',
                    header: 'Research Type',
                },
                {
                    accessorKey: 'participant_type',
                    header: 'Participant Type',
                },
                {
                    accessorKey: 'support',
                    header: 'Evidence',
                },
                {
                    accessorKey: 'rating',
                    header: 'Rating',
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
                    mode: 'light',
                    primary: {
                        main: '#6E8C30',
                    },
                    background: {
                        default: '#E5E7DE', // background color for the default background
                    },
                },
                typography: {
                    button: {
                        textTransform: 'none', //customize typography styles for all buttons in table by default
                        fontSize: '1.2rem',
                    },
                },
                components: {
                    MuiIconButton: {
                        styleOverrides: {
                            root: {
                                color: '#334C1F',
                            }
                        }
                    },

                    MuiTooltip: {
                        styleOverrides: {
                            tooltip: {
                                fontSize: '1.1rem', //override to make tooltip font size larger
                            },
                        },
                    },
                    MuiSwitch: {
                        styleOverrides: {
                            thumb: {
                                color: '#334C1F', //change the color of the switch thumb in the columns show/hide menu to pink
                            },
                        },
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

                                muiBottomToolbarProps={{
                                    sx: {
                                        position: 'absolute',
                                        bottom: '0',
                                    },
                                }}

                                muiTableBodyRowProps={{
                                    sx: {
                                        "& .MuiTableCell-root": {
                                            borderTop: '1px solid black'
                                        }
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
                                )}/>
            </ThemeProvider>
        </div>
    );
}

export default Results;