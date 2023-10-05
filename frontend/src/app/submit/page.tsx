'use client'
import style from "../../styles/SubmitPage.module.css"

import React, { useState } from 'react';

interface FormData {
    title: string;
    author: string;
    journal: string;
    year: number;
    volume: string;
    issue: string;
    pages: number;
    DOI: string;
}

const initialFormData: FormData = {
    title: '',
    author: '',
    journal: '',
    year: 0,
    volume: '',
    issue: '',
    pages: 0,
    DOI: '',
};

const NumberForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Do something with formData, like printing it to the console or sending it to a server.
        console.log(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'year' || name === 'pages' ? parseFloat(value) : value,
        });
    };

    return (
<div>
    <div className={style.topic}>
        <h1> SUBMIT A NEW ARTICLE</h1>
        </div>
            <div className={style.formoutline}>

            <form onSubmit={handleSubmit}>
                <label>
                    Article Title*<br/>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                    />
                </label>
                <br/>
                <label>
                    Author(S)*<br/>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        placeholder= "Full Name"
                        required
                    />
                </label>
                <br/>

                <label>
                    Publication Information
                    <br/>
                    <input
                        type="text"
                        name="journal"
                        value={formData.journal}
                        onChange={handleChange}
                        placeholder= "Journal Name"
                    />
                </label>
                <br/>
                <label>
                    <input
                        type="number"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        placeholder="Publication Date"
                    />
                </label>
                <br/>
                <label>

                    <input
                        type="text"
                        name="volume"
                        value={formData.volume}
                        onChange={handleChange}
                        placeholder="Volume"
                    />
                </label>
                <br/>
                <label>

                    <input
                        type="text"
                        name="issue"
                        value={formData.issue}
                        onChange={handleChange}
                        placeholder="Issue"
                    />
                </label>
                <br/>
                <label>

                    <input
                        type="number"
                        name="pages"
                        value={formData.pages}
                        onChange={handleChange}
                        placeholder="Page(S)"
                    />
                </label>
                <br/>
                <label>
                    DOI*<br/>
                    <input
                        type="text"
                        name="DOI"
                        value={formData.DOI}
                        onChange={handleChange}
                        placeholder="DOI"
                        required
                    />
                </label>
                <br/>
                <br/>
                <div className={style.button}>
                <button type="submit">Submit</button>
                </div>
            </form>
    </div>
     </div>

    );
};

export default NumberForm;
