import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const ApproveComment = ({choreId}) => {
  // State to store values
  const [commentValue, setCommentValue] = useState('');
  console.log('Came here');
//ChoreID and Comment value are passed as a parameter.
  //This process updates the Comment Value and the Status value for a given ChoreID.
  //This is a Approve process.
  const handleApproveComment = async (choreId, commentValue) => {
    console.log("choreId" + choreId);
    try {
      const response = await fetch(`http://localhost:8080/approvecomment/${choreId}?commentValue=${commentValue}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        //Calling the existing fetch function of the AssignedChores for displaying the Assigned data.
       // fetchAssignedChores();
        console.log('Updated the Approve comment and Assigned to kid successfully.');
      } else {
        console.error('Could not update the Approve comment.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // Handler function for setting the Approve Comment Value.
  const handleCommentApproveChange = (e) => {
    setCommentValue(e.target.value);
  };

    // Handler function for Calling the handleRedoComment which
  // Calls the controller file to update the Chores table.
  const handleCommentApproveChangeSubmmit = (choreId) => {
    handleApproveComment(choreId, commentValue);
  };

  return (
    <div>
        <p>test</p>
     <label>Comment:</label>
      <textarea value={commentValue} onChange={handleCommentApproveChange} />
      {/* Button for the comment click */}
      <button className='button' type="button" onClick={() => handleCommentApproveChangeSubmmit(choreId)}>Submit</button>

    </div>);

    };
 export default ApproveComment;   