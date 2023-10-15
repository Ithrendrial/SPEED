'use client'
import style from "../../styles/SubmitPage.module.css"
import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
    title: string;
    authors: string[];
    journal_name: string;
    publication_date: string;
    volume: number;
    issue: number;
    pages: string;
    doi: string;
    moderator_status: string;
    method: string[];
    claim: string[];
    research_type:string[],
    participant_type: string[];
    summary: string[];
    support: string[];
    published_status: boolean;
    rating: number[];
}

const initialFormData: FormData = {
    title: '',
    authors: [""],
    journal_name: '',
    publication_date: '',
    volume: 0,
    issue: 0,
    pages: '',
    doi: '',
    moderator_status: "unmoderated",//Need
    method: [""],
    claim: [""],
    research_type: [""],
    participant_type: [""],
    summary: [""],
    support: ["neutral"],//Need
    published_status: false,//Need
    rating: [0]
};

/*const newArticleData =
    {
        title: "Testing mob program",
        authors: ["author 7", "author 8", "author 9"],
        journal_name: "Journal Name",
        publication_date: "2012",
        volume: null,
        issue: 2,
        pages: "1-15",
        doi: "https://doi.org/10.1088/1367",
        moderator_status: "unmoderated",//Need
        method: [""],
        claim: [""],
        research_type: [""],
        participant_type: [""],
        summary: [""],
        support: ["neutral"],//Need
        published_status: false,//Need
        rating: [0]
    }*/
// Add other properties as needed



const NumberForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/articles', formData)
            .then((response) => {
                console.log('Article created successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error creating article:', error);
            });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({

            ...formData,
            [name]: name === 'authors' ? [value] : value,
        });

    };
    const addAuthor = () => {
        setFormData({
            ...formData,
            authors: [...formData.authors, ''],
        });
    };
    return (
        <div>
            <div className={style.topic}>
                <h1>SUBMIT A NEW ARTICLE</h1>
            </div>
            <div className={style.formoutline}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Article Title*<br />
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            required
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        Author(s)*<br />
                        {formData.authors.map((author, index) => (
                            <input
                                type="text"
                                name="authors"
                                key={index}
                                value={author}
                                onChange={(e) => {
                                    const newAuthors = [...formData.authors];
                                    newAuthors[index] = e.target.value;
                                    setFormData({
                                        ...formData,
                                        authors: newAuthors,
                                    });
                                }}
                                placeholder="Full Name"
                                required
                            />
                        ))}
                        <div className={style.button}>
                        <button type="button" onClick={addAuthor}>Add Author</button>
                        </div>
                    </label>
                    <br />

                    <label>
                        Publication Information<br />
                        <input
                            type="text"
                            name="journal_name"
                            value={formData.journal_name}
                            onChange={handleChange}
                            placeholder="Journal Name"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="text"
                            name="publication_date"
                            value={formData.publication_date}
                            onChange={handleChange}
                            placeholder="Publication Date"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="number"
                            name="volume"
                            value={formData.volume}
                            onChange={handleChange}
                            placeholder="Volume"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="text"
                            name="issue"
                            value={formData.issue}
                            onChange={handleChange}
                            placeholder="Issue"
                        />
                    </label>
                    <br />
                    <label>
                        <input
                            type="text"
                            name="pages"
                            value={formData.pages}
                            onChange={handleChange}
                            placeholder="Page(S)"
                        />
                    </label>
                    <br />
                    <br />
                    <label>
                        DOI*<br />
                        <input
                            type="text"
                            name="doi"
                            value={formData.doi}
                            onChange={handleChange}
                            placeholder="DOI"
                            required
                        />
                    </label>
                    <div className={style.button}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NumberForm;

