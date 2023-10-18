'use client'
import style from "../../styles/SubmitPage.module.css"
import React, { useState } from 'react';
import axios from 'axios';
import {BiPlusMedical} from "react-icons/bi";

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

const initialFormData: FormData = { // Initialise form data values
    title: '',
    authors: [""],
    journal_name: '',
    publication_date: '',
    volume: 0,
    issue: 0,
    pages: '',
    doi: '',
    moderator_status: "unmoderated", // Required Field
    method: [""],
    claim: [""],
    research_type: [""],
    participant_type: [""],
    summary: [""],
    support: ["neutral"], // Required Field
    published_status: false,
    rating: [0]
};

const NumberForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    

    // Handle submit article button press //
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios
            .post('https://speed-backend-seven.vercel.app/articles', formData)
            .then((response) => {
                console.log('Article created successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error creating article:', error);
            });
    };

    // Update authors list with added author field //
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const {name, value} = e.target;
        setFormData({

            ...formData,
            [name]: name === 'authors' ? [value] : value,
        });

    };

    // Set form data with new author //
    const addAuthor = () => {
        setFormData({
            ...formData,
            authors: [...formData.authors, ''],
        });
    };


    // Toggle between input type string and date to display placeholder text on publication date picker //
    const onDateFocus = (e: React.FocusEvent<HTMLInputElement>) => (e.target.type = "date");
    const onDateBlur = (e: React.FocusEvent<HTMLInputElement>) => (e.target.type = "text");

    return (
        <div>
            <div className="heading" style={ {textAlign: "center"}}>
                <h1>SUBMIT A NEW ARTICLE</h1>
            </div>
            <div className={style.form_container}>
                <form onSubmit={handleSubmit}>
                    <label>
                        Article Title*<br /> {/*Form input for Article Title*/}
                        <input
                            type="text"
                            className={style.text_input}
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
                        <div className={style.authors_container}> {/*Form input for Authors*/}
                            <div className={style.author_list}>
                        {formData.authors.map((author, index) => (
                            <input
                                type="text"
                                className={style.text_input}
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
                            </div>
                        <div className={style.add_author_button}>
                        <button type="button" onClick={addAuthor}><BiPlusMedical /></button>
                        </div>
                        </div>
                    </label>
                    <br />

                    <label>
                        Publication Information
                    </label>
                    <div className={style.publication_container}>
                        <div className={style.publication_item_row_one}>
                            <div className={style.publication_item}> {/*Form input for Journal Name*/}
                            <input
                                type="text"
                                className={style.text_input}
                                name="journal_name"
                                value={formData.journal_name}
                                onChange={handleChange}
                                placeholder="Journal Name"
                            />
                            </div>
                            <div className={style.publication_item}> {/*Form input for Publication Date*/}
                                <input
                                    type="text"
                                    className={style.date_input}
                                    name="publication_date"
                                    value={formData.publication_date}
                                    onChange={handleChange}
                                    placeholder="Publication Date"
                                    onFocus={onDateFocus}
                                    onBlur={onDateBlur}
                                />
                            </div>
                        </div>
                        <div className={style.publication_item_row_one}>
                            <div className={style.publication_item}> {/*Form input for Volume Number*/}
                                <input
                                    type="number"
                                    className={style.number_input}
                                    name="volume"
                                    value={formData.volume === 0 ? '' : formData.volume}
                                    onChange={handleChange}
                                    placeholder="Volume"
                                />
                            </div>
                            <div className={style.publication_item}> {/*Form input for Issue Number*/}
                                <input
                                    type="number"
                                    className={style.number_input}
                                    name="issue"
                                    value={formData.issue === 0 ? '' : formData.issue}
                                    onChange={handleChange}
                                    placeholder="Issue"
                                />
                            </div>
                            <div className={style.publication_item}> {/*Form input for Page Range*/}
                                <input
                                    type="text"
                                    className={style.text_input}
                                    name="pages"
                                    value={formData.pages}
                                    onChange={handleChange}
                                    placeholder="Page(s)"
                                />
                            </div>
                        </div>
                    </div>
                    <br />
                    <label>
                        DOI*<br /> {/*Form input for DOI link*/}
                        <input
                            type="text"
                            className={style.text_input}
                            name="doi"
                            value={formData.doi}
                            onChange={handleChange}
                            placeholder="DOI"
                            required
                        />
                    </label>
                    <div className={style.submit_button_wrapper}>
                    <div className={style.submit_button}>
                        <button type="submit">Submit</button>
                    </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NumberForm;

