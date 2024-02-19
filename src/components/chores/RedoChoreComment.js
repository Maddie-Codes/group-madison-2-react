import React, { useState, useEffect } from 'react';
import '../../styles/AssignGroup.css';
import { useNavigate } from 'react-router-dom';
import CommentChore from './CommentChore.js';
const username = "AbbyBarber";


const RedoChoreComment = ({ choreId, commentValue })  => {
  console.log("choreId"+choreId);
    const handleRedoComment = async (choreId, commentValue) => {
            try {
                const response = await fetch(`http://localhost:8080/redocomment/${choreId}?commentValue=${commentValue}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                                   });
    
                if (response.ok) {
                    console.log('Updated the Redo comment and Assigned to kid successfully.');
                } else {
                    console.error('Could not update the comment.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        };

        handleRedoComment(choreId, commentValue);
           

    return (
 
     <div>
            {/* Nothing to be done*/}
     </div>
    );

};

export default RedoChoreComment;