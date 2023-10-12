"use client";

import style from '../styles/RatingPopUp.module.css';
import React, {useState} from 'react';
import StarRatings from 'react-star-ratings';

export default function RatingPopUp() {

    const [rating, setRating] = useState<number>(0);

    function changeRating(newRating : number) {
        setRating(newRating);
    }

    return (
        <div className={style.background}>
            <div className={style.popUpContainer}>
                <div className={style.text}>Rate Article</div>
                <div className={style.rating}>
                    <StarRatings
                        rating={ rating }
                        changeRating={ changeRating }
                        starDimension="min(7vw, 5.5vh)"
                        starSpacing="min(1vw, 0.8vh)"
                        starRatedColor="rgb(238, 198, 31)"
                    />
                </div>
                <div className={style.buttons}>
                    <button className="button">Add Rating</button>
                </div>
            </div>
        </div>
    );
}