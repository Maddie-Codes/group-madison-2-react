import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import '../../styles/ChoreStyles.css';
import { request,getAuthToken,getUserIdFromAuthToken} from '../../axios_helper'; 
//import getUserIdFromAuthToken from '../../axios_helper';
////////Exteranl API Call Added by Monica//////////////////////
import ApiCall from '../api/ApiCall.js';
///////////////////////////////////////////////////////////////

// Calendar icon component
const CalendarIcon = React.forwardRef(({ onClick }, ref) => (
  <button type="button" onClick={onClick} ref={ref}>
    <FaCalendarAlt />
  </button>
));

// Main component to assign chores
const AssignChore = ({ choreId,id ,handleAssignChore}) => {
  // State variables to keep track of selected values
  const [selectedKid, setSelectedKid] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [selectedValueType, setSelectedValueType] = useState('Points');
  const [selectedValue, setSelectedValue] = useState(1);
 
  const [kids, setKids] = useState([]);

  // Fetch the list of kids from the server when the component is mounted
  
    const fetchKids = async () => {
      
         const id = getUserIdFromAuthToken(getAuthToken());
        // Fetch the list of kids from the server using axios
        const response = await request('get', 'api/assignments/kids', null, id);
        if (response.status === 200) {
          
           setKids(response.data);

        } else {
          console.error('Failed to fetch kids');
        }
      
    };
    useEffect(() => {
    // Call the fetchKids function
    fetchKids();
  }, [id]);

  // Handler function for changing the selected kid
  const handleKidChange = (e,id) => {
    setSelectedKid(e.target.value);
  };

  // Handler function for changing the selected due date
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  // Handler function for changing the selected value type (points or dollars)
  const handleValueTypeChange = (e) => {
    setSelectedValueType(e.target.value);
  };

  // Handler function for changing the selected value (number input)
  const handleValueChange = (e) => {
    setSelectedValue(parseInt(e.target.value, 10));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedKid) {
      alert('Please select a kid.');
      return;
    }
  
    if (!dueDate) {
      alert('Please select a due date.');
      return;
    }
  
    if (!selectedValueType) {
      alert('Please select a value type.');
      return;
    }
  
    if (!selectedValue || selectedValue < 1 || selectedValue > 100) {
      alert('Please enter a valid value between 1 and 100.');
      return;
    }
  
    const authToken = getAuthToken();
      const id = getUserIdFromAuthToken(authToken);
    await handleAssignChore(id,choreId, selectedKid, dueDate, selectedValueType, selectedValue);
  }



  return (
    <form className='assign_form' onSubmit={handleSubmit}>
      {/* Dropdown for selecting a kid */}
      <div className='date-kid'>
        <select value={selectedKid} onChange={handleKidChange}>
          <option value="">Select Kid</option>
          {kids && Array.isArray(kids) && kids.map((kid) => (
            <option key={kid.kidId} value={kid.kidId}>
              {kid.name}
            </option>
          ))}
        </select>

        {/* Date picker for selecting a due date */}
        <DatePicker
          id="dueDate"
          selected={dueDate}
          onChange={handleDueDateChange}
          customInput={<CalendarIcon />}
          dateFormat="yyyy-MM-dd"
        />
        {/* External Api date Added by Monica  */}
        {dueDate && <ApiCall dueDate={dueDate} />}
      </div>

      {/* Dropdown for selecting value type (points or dollars) */}
      <div className='date-kid'>
        <select value={selectedValueType} onChange={handleValueTypeChange}>
          <option value="Points">Points</option>
          <option value="Dollars">Dollars</option>
        </select>

        {/* Number input for selecting a value */}
        <input
          type="number"
          value={selectedValue}
          onChange={handleValueChange}
          min="1"
          max="100"
        />
      </div>

      {/* Hidden input for storing choreId */}

      <input type="hidden" name="choreId" value={choreId} />
      {/* Button to submit the form */}
      <button type="submit">Assign</button>
    </form>
  );
};



export default AssignChore;
