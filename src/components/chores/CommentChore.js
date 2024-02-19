import React, { useState, useEffect } from 'react';
import '../../styles/AssignGroup.css';
import { useNavigate } from 'react-router-dom';
import ApproveChoreComment from './ApproveChoreComment.js';
const username = "AbbyBarber";
const choreId=748;

const CommentChore = () => {
       
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
            <label>Comment:</label>
            <textarea value={commentValue} onChange={handleCommentChange} />
          </div>
    
          {/* Button to submit the comment */}
          <button type="Redo" onClick={handleCommentSubmit}>Submit Comment</button>
          {commentValue && statusCheck && <ApproveChoreComment choreId={choreId} commentValue={commentValue} />}
        </div>
        </div>
      );
    };
    

export default CommentChore;