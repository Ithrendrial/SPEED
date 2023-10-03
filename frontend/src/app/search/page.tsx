"use client";

import style from "../../styles/SearchPage.module.css";
import React, { useState, useEffect } from 'react';

export default function Search() {
  const [selectedMethodButton, setSelectedMethodButton] = useState('');
  const [renderClaims, setRenderClaims] = useState(false);
  const [selectedClaimButton, setSelectedClaimButton] = useState('');
  const [claimValues, setClaimValues] = useState<string[]>([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleMethodButtonClick = (value: string, associatedValues: string[]) => {
    setSelectedMethodButton(value);
    setRenderClaims(true);
    setClaimValues(associatedValues);
    setIsSubmitDisabled(true);
  };

    useEffect(() => {
        if(selectedClaimButton !== ''){
            setIsSubmitDisabled(false);
        }
    }, [selectedClaimButton]);

    const handleClaimButtonClick = (claim: string) => {
        setSelectedClaimButton(claim);
    };

    const handleResultsButtonClick = () => {
        const queryString = `?method=${selectedMethodButton}&claim=${selectedClaimButton}`;

        window.history.pushState(undefined, '', `/results${queryString}`);
        window.location.reload();
    };

  return (
      <>
        <div className="heading">SEARCH</div>
          <div className={ style.subheading }>Software Engineering Method</div>
          <div className={ style.methods }>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Test-Last Development', ['Code Quality Improvement', 'Comprehensive Documentation', 'Client Satisfaction'])}>
                  Test-Last Development
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Agile Software Development', ['Faster Delivery', 'Adaptability', 'Customer Collaboration'])}>
                  Agile Software Development
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Kanban', ['Workflow Visualization', 'Reduced Waste', 'Efficiency'])}>
                  Kanban
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Feature-Driven Development', ['Feature-Centric', 'Short Development Cycles', 'Client Collaboration'])}>
                  Feature-Driven Development
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Scrum', ['Sprint Planning', 'Daily Standup', 'Incremental Progress'])}>
                  Scrum
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Continuous Integration', ['Automated Testing', 'Frequent Integration', 'Reduced Errors'])}>
                  Continuous Integration
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Test-Driven Development', ['Test-First Approach', 'Improved Code Quality', 'Rapid Feedback'])}>
                  Test-Driven Development
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Extreme Programming', ['Continuous Feedback', 'Pair Programming', 'Collective Code Ownership'])}>
                  Extreme Programming
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Spiral Model', ['Risk Management', 'Iterative Development', 'Client Feedback'])}>
                  Spiral Model
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Waterfall Model', ['Sequential Phases', 'Documentation-Driven', 'Inflexible'])}>
                  Waterfall Model
              </button>
              <button className={ style.button } onClick={() => handleMethodButtonClick('Pair Programming', ['Collaborative Coding', 'Knowledge Sharing', 'Reduced Errors'])}>
                  Pair Programming
              </button>
          </div>

                {renderClaims && (
                <div>
                    <div className={ style.subheading }>Claim</div>
                    <div className={ style.claims }>
                  {claimValues.map((claim, index) => (
                      <button
                          key={ index }
                          className={ style.button }
                          onClick={() => setSelectedClaimButton(claim)}
                      >
                        {claim}
                      </button>
                  ))}
                </div>
                </div>
                )}

          <button className={ style.submit } onClick={ handleResultsButtonClick } disabled={ isSubmitDisabled }>Submit</button>
      </>
  );
}