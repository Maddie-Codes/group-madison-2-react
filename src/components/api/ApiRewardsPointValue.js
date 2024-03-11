import React, { useState, useEffect } from 'react';

const ApiRewardsPointValue = ({ choreId, dueDate, points }) => {
  //If the duedate is a Date then give dueDate or else give due.dueDate.
  const dateVal = dueDate instanceof Date ? dueDate : dueDate.dueDate;
  // Changing this value to a date 
  const dateObjectVal = new Date(dateVal);
  // Then format the date as yyyy-mm-dd
  const formattedDueDate = dateObjectVal.toISOString().split('T')[0];

  useEffect(() => {

    // Define the rewardApiCall function
    const rewardApiCall = async (choreId, formattedDueDate, points) => {
      try {
        const response = await fetch(`http://localhost:8080/holiday-reward?choreId=${choreId}&dueDate=${formattedDueDate}&points=${points}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          console.log('Posted successfully to get the Rewards for Public holiday check.');

          } else {
          console.error('Could not Post to get the Rewards for Public holiday check');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    // Call the rewardApiCall function
    rewardApiCall(choreId, formattedDueDate, points);
  }, [choreId, formattedDueDate, points]);
  return (
    <div>
      {/* Nothing to be done*/}
    </div>
  );

};
export default ApiRewardsPointValue;