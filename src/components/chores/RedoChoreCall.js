import React, { useState, useEffect } from 'react';
import '../../styles/AssignGroup.css';
import { useNavigate } from 'react-router-dom';
import RedoChoreComment from './RedoChoreComment';
const username = "AbbyBarber";
const choreId=2;

const RedoChoreCall = ({choreId}) => {
       
      const [commentValue, setCommentValue] = useState('');
      const [statusCheck, setStatusCheck] = useState('');   
      const handleCommentChange = (e) => {
        setCommentValue(e.target.value);
      };
    
      // Handler function for submitting the comment
      const handleCommentSubmit = () => {
        setStatusCheck(true)
        console.log("Comment submitted:");
      };
    
      return (
        <div className='group-chore'>
        <div>
          {/* Comment box */}
          <div>
          <button type="button">Redo</button>
            <label>Comment:</label>
            <textarea value={commentValue} onChange={handleCommentChange} />
          </div>
    
          {/* Button to submit the comment */}
          <button type="button" onClick={handleCommentSubmit}>Submit Comment</button>
          {commentValue && statusCheck && <RedoChoreComment choreId={choreId} commentValue={commentValue} />}
        </div>
        </div>
      );
    };
    

export default RedoChoreCall;