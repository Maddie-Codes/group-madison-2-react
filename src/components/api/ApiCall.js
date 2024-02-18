import React, { useState, useEffect } from 'react';

const fetchApi = async (formattedDueDate) => {

  try {
    const response = await fetch(`http://localhost:8080/holiday-data?dueDate=${formattedDueDate}`);
    if (!response) {
      throw new Error('Failed to fetch data. Response is undefined.');
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
const ApiCall = (dueDate) => {
  const [isLoading, setIsLoading] = useState(true);
  const [box, setBox] = useState(false);

  //If the duedate is a Date then give dueDate or else give due.dueDate.
  const dateVal = dueDate instanceof Date ? dueDate : dueDate.dueDate;

  // Changing this value to a date 
  const dateObjectVal = new Date(dateVal);

  // Then format the date as yyyy-mm-dd
  const formattedDueDate = dateObjectVal.toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchApi(formattedDueDate);
        if (result) {
          publicHolidayIns(formattedDueDate);
          setBox(true);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const publicHolidayIns = async (formattedDueDate) => {
      try {
        const holidayData = {
          holidayDate: formattedDueDate,
        };
        const response = await fetch('http://localhost:8080/holiday-insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(holidayData),
        });
          // const responseData = await response.json();
          //console.log('Response from Spring Boot:', responseData);
      } catch (error) {
        console.error('Error making the request:', error);
      }
    };


    fetchData(formattedDueDate);

  }, [formattedDueDate]);

  const closeBox = () => {
    setBox(false);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      {box && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <p>{formattedDueDate} is a public holiday!</p>
            <button onClick={closeBox}>Ok</button>
          </div>
        </div>
      )}
    </div>
  );

};
export default ApiCall;