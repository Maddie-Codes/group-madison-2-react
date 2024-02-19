import React, { useState, useEffect } from 'react';

const ApiRewardsPointValue = (dueDate,points) => {
 // const [isLoading, setIsLoading] = useState(true);
  const [box, setBox] = useState(false);
  const[outputOfFetch,setOutputOfFetch]=useState(null);
  //const pointsval=1;

  //If the duedate is a Date then give dueDate or else give due.dueDate.
  const dateVal = dueDate instanceof Date ? dueDate : dueDate.dueDate;

  // Changing this value to a date 
  const dateObjectVal = new Date(dateVal);
console.log("points"+points);
console.log(Object.keys(points));

  const pointVal=2;
  // Then format the date as yyyy-mm-dd
  const formattedDueDate = dateObjectVal.toISOString().split('T')[0];
    const rewardApiCall = async (formattedDueDate, pointVal) => {
            try {
                const response = await fetch(`http://localhost:8080/holiday-reward?dueDate=${formattedDueDate}&points=${pointVal}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                                   });
    
                if (response.ok) {
                    console.log('Posted successfully.');
                } else {
                    console.error('Could not Post');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };
  
        rewardApiCall(formattedDueDate, pointVal);


  //To be added in the assign chore bhavana
  //               {/* Api Rewards call added  */}        
  //{selectedValue.length>0 && <ApiCApiReward dueDate={dueDate} pointval={selectedValue} />}

  return (
    <div>
      {/* Nothing to be done*/}
    </div>
  );

};
export default ApiRewardsPointValue;