"use client";

import React, { useState, useEffect } from 'react';
import style from '../../styles/results.module.css';
import axios from 'axios';

interface Article {
    articleId: string;
    title: string;
    authors: string[];
}

function Results() {
    const [articles, setArticles] = useState<Article[]>([]);

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

    return (
        <div>
            <table className={style.table}>
                <thead>
                <tr>
                    <th className={style.th}>Title</th>
                    <th className={style.th}>Authors</th>
                </tr>
                </thead>
                <tbody>
                {articles.map((article) => (
                    <tr key={article.articleId}>
                        <td className={style.td}>{article.title}</td>
                        <td className={style.td}>{article.authors.join(', ')}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Results;