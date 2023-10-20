"use client";

import style from '../styles/RatingPopUp.module.css';
import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

interface RatingPopUpProps {
    backgroundPressed: (e: React.MouseEvent, isClicked: boolean) => void; // Has the modal background been pressed to close
    articleId: string; // ID of the article being rated
    originalRatingArray: string[]; // Rating array before new rating is added
    claimIndex: string; // Index of the claim being rated for the article ID
}

export default function RatingPopUp(props: RatingPopUpProps) {
    // Initialise article data //
    const [ratingAdded, setRatingAdded] = useState<boolean>(false);
    const [newRating, setNewRating] = useState<number>(0);
    const claimIndex = parseInt(props.claimIndex, 10);

    // Handler to store new rating from start rating component as a state //
    function changeRating(newRating : number) {
        setNewRating(newRating);
        setRatingAdded(true);
    }

    // Update the article in the database with the new rating //
    function updateRating(e: React.MouseEvent) {
        props.originalRatingArray[claimIndex] = props.originalRatingArray[claimIndex] + "," + newRating; // Append new rating to the prop rating array ready to inject into the database
        const updatedRatingArray = {
            "rating": props.originalRatingArray // Store updated array with new rating
        }

        // Call database and replace rating array with updated rating array //
        axios
            .patch('https://speed-backend-seven.vercel.app/articles/' + props.articleId, updatedRatingArray)
            .then((response) => {
                console.log('Article updated successfully:', response.data);
            })
            .catch((error) => {
                console.error('Error updating article:', error); // Return an error if database update was unsuccessful
            });

        props.backgroundPressed(e, true); // Close modal on form submission
    }

    return (
        <div className={style.background} onClick={(e) => props.backgroundPressed(e, true)}> {/* If background is pressed, close modal */}
            <div className={style.popUpContainer} onClick={(e) => e.stopPropagation()}> {/* If modal itself is pressed, prevent modal close */}
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
                <div className={style.buttons}> {/* If rating has not been set, render button disabled */}
                    { ratingAdded ?
                        <button className="button" onClick={(e) => updateRating(e)}>Add Rating</button>
                        : <button className="button" onClick={(e) => updateRating(e)} disabled>Add Rating</button>
                    }
                </div>
            </div>
        </div>
    );
}