"use client";

import style from "../../styles/SearchPage.module.css";
import React, { useState, useEffect } from 'react';

export default function Search() {

    const [selectedMethod, setSelectedMethod] = useState<string>('');
    const [selectedClaim, setSelectedClaim] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);


    useEffect(() => {
        if(selectedClaim !== ''){
            setIsSubmitDisabled(false);
        }
    }, [selectedClaim]);

    const handleMethodChange = (method: string) => {
        setSelectedMethod(method);
        setIsSubmitDisabled(true);
    };

    const handleButtonClick = (claim: string) => {
        setSelectedClaim(claim);
    };

    const handleSubmitButtonClick = () => {
        const queryString = `?method=${selectedMethod}&claim=${selectedClaim}`;

        window.history.pushState(undefined, '', `/results${queryString}`);
        window.location.reload();
    };

    const methodData = {
        'Test-Last Development': ['Code Quality Improvement', 'Comprehensive Documentation', 'Client Satisfaction'],
        'Agile Software Development': ['Faster Delivery', 'Adaptability', 'Customer Collaboration'],
        'Kanban': ['Workflow Visualization', 'Reduced Waste', 'Efficiency'],
        'Feature-Driven Development': ['Feature-Centric', 'Short Development Cycles', 'Client Collaboration'],
        'Scrum': ['Sprint Planning', 'Daily Standup', 'Incremental Progress'],
        'Continuous Integration': ['Automated Testing', 'Frequent Integration', 'Reduced Errors'],
        'Test-Driven Development': ['Test-First Approach', 'Improved Code Quality', 'Rapid Feedback'],
        'Extreme Programming': ['Continuous Feedback', 'Pair Programming', 'Collective Code Ownership'],
        'Spiral Model': ['Risk Management', 'Iterative Development', 'Client Feedback'],
        'Waterfall Model': ['Sequential Phases', 'Documentation-Driven', 'Inflexible'],
        'Pair Programming': ['Collaborative Coding', 'Knowledge Sharing', 'Reduced Errors'],
    };

  return (
      <div className={ style.page }>
        <div className="heading">SEARCH</div>
          <div className={ style.options}>
        <div className={ style.subheading }>Software Engineering Method</div>
        <div className={ style.methods }>
              {Object.keys(methodData).map((method) => (
                  <label  className={`${selectedMethod === method ? style.label_checked : style.button}`} key={method}>
                      <input
                          type="radio"
                          className={ style.hidden_radio }
                          value={method}
                          checked={selectedMethod === method}
                          onChange={() => handleMethodChange(method)}
                      />
                      {method}
                  </label>
              ))}
        </div>


        {selectedMethod && (
            <>
                <div className={ style.subheading }>Claim</div>
                    <div className={ style.claims }>
                        {methodData[selectedMethod as keyof typeof methodData].map((claim: string) => (
                            <button
                                key={claim}
                                className={style.button}
                                onClick={() => handleButtonClick(claim)}
                            >
                                {claim}
                            </button>
                        ))}
                    </div>

            </>
        )}
          </div>
        <button className={ style.submit } onClick={ handleSubmitButtonClick } disabled={ isSubmitDisabled }>SEARCH</button>
      </div>
  );
}