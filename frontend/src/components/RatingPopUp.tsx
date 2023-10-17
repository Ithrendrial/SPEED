"use client";

import style from '../styles/RatingPopUp.module.css';
import React, {useEffect, useState} from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

interface RatingPopUpProps {
    backgroundPressed: (e: React.MouseEvent, isClicked: boolean) => void;
    articleId: string;
    originalRatingArray: string[];
    claimIndex: string;
}

export default function RatingPopUp(props: RatingPopUpProps) {
    const [ratingAdded, setRatingAdded] = useState<boolean>(false);
    const [newRating, setNewRating] = useState<number>(0);
    const claimIndex = parseInt(props.claimIndex, 10);
    function changeRating(newRating : number) {
        setNewRating(newRating);
        setRatingAdded(true);
    }

    function updateRating(e: React.MouseEvent) {
        props.originalRatingArray[claimIndex] = props.originalRatingArray[claimIndex] + "," + newRating;

        const updatedRatingArray = {
            "rating": props.originalRatingArray
        }

        axios
            .patch('https://speed-backend-seven.vercel.app/articles/' + props.articleId, updatedRatingArray)
            .then((response) => {
                console.log('Article updated successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error updating article:', error);
            });

         props.backgroundPressed(e, true);
    }

    return (
        <div className={style.background} onClick={(e) => props.backgroundPressed(e, true)}>
            <div className={style.popUpContainer} onClick={(e) => e.stopPropagation()}>
                <div className={style.text}>Rate Article</div>
                <div className={style.rating}>
                    <StarRatings
                        rating={ newRating }
                        changeRating={ changeRating }
                        starDimension="min(7vw, 5.5vh)"
                        starSpacing="min(1vw, 0.8vh)"
                        starRatedColor="rgb(238, 198, 31)"
                        data-testid="star-rating"
                    />
                </div>
                <div className={style.buttons}>
                    { ratingAdded ?
                        <button className="button" onClick={(e) => updateRating(e)}>Add Rating</button>
                        : <button className="button" onClick={(e) => updateRating(e)} disabled>Add Rating</button>
                    }
                </div>
            </div>
        </div>
    );
}