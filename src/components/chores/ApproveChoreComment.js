import React, { useState, useEffect } from 'react';
import '../../styles/AssignGroup.css';
import { useNavigate } from 'react-router-dom';
import CommentChore from './CommentChore.js';
const username = "AbbyBarber";


const ApproveChoreComment = ({ choreId, commentValue })  => {
  console.log("choreId"+choreId);
    const handleApproveComment = async (choreId, commentValue) => {
            try {
                const response = await fetch(`http://localhost:8080/approvecomment/${choreId}?commentValue=${commentValue}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                                   });
    
                if (response.ok) {
                    console.log('Updated the approve comment successfully.');
                } else {
                    console.error('Could not update the comment.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        handleApproveComment(choreId, commentValue);
           

    return (
 
     <div>
            {/* Nothing to be done*/}
     </div>
    );

};

export default ApproveChoreComment;