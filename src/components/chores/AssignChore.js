import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import '../../styles/ChoreStyles.css';
import ApiCall from '../api/ApiCall.js'
import ApiReward from '../api/ApiRewardsPointValue.js'
// Calendar icon component
const CalendarIcon = React.forwardRef(({ onClick }, ref) => (
  <button type="button" onClick={onClick} ref={ref}>
    <FaCalendarAlt />
  </button>
));

// Main component to assign chores
const AssignChore = ({ choreId, handleAssignChore }) => {
  // State variables to keep track of selected values
  const [selectedKid, setSelectedKid] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [selectedValueType, setSelectedValueType] = useState('points');
  const [selectedValue, setSelectedValue] = useState(1);
  const [kids, setKids] = useState([]);
  const [rewardsStatus,setRewardsStatus]=useState(0);

  // Fetch the list of kids from the server when the component is mounted
  useEffect(() => {
    fetch('http://localhost:8080/api/assignments/kids')
      .then(response => response.json())
      .then(data => setKids(data))
      .catch(error => console.error('Error fetching kids:', error));
  }, []);

  // Handler function for changing the selected kid
  const handleKidChange = (e) => {
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
    setRewardsStatus(1);
  };

  // Handler function for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAssignChore(choreId, selectedKid, dueDate, selectedValueType, selectedValue);
  }
 
  return (
    <form onSubmit={handleSubmit}>
      {/* Dropdown for selecting a kid */}

      <div className='date-kid'>
      <label > 
        Kid:
        <select value={selectedKid} onChange={handleKidChange}>

          <option value="">Select Kid</option>
          {kids.map((kid) => (
            <option key={kid.kidId} value={kid.kidId}>
              {kid.name}
            </option>
          ))}
        </select>
        </label>


        {/* Date picker for selecting a due date */}


        <DatePicker
          id="dueDate"
          selected={dueDate}
          onChange={handleDueDateChange}
          customInput={<CalendarIcon />}
          dateFormat="yyyy-MM-dd"
        />
        {/* Api date checking added  */}        
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
                {/* Api Rewards call added  */}        
  {selectedValue !== null && selectedValue > 0 &&dueDate&&rewardsStatus==true&& <ApiReward dueDate={dueDate} points={selectedValue} />}

      </div>


      {/* Hidden input for storing choreId */}
      <input type="hidden" name="choreId" value={choreId} />
      {/* Button to submit the form */}
      <button type="submit">Assign</button>
    </form>


  );
};

export default AssignChore;