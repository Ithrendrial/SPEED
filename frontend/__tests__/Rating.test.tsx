import { render, screen, fireEvent } from '@testing-library/react'
import RatingPopUp from "@/components/RatingPopUp";
import React, {MouseEventHandler, ReactNode, useState} from "react";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Results from "@/app/results/page";
describe('Rating Pop Up', () => {

    const mockAxios = new MockAdapter(axios);

    it('should change the rating when a new star is clicked', () => {
        // render(<RatingPopUp />)
        // const addRatingButton = screen.getByRole('button')
        // const stars = screen.getByRole('StarRatings')
        //
        // fireEvent.click(addRatingButton)
        // expect()
    });
})