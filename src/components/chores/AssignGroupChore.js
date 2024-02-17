import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import '../../styles/AssignGroup.css';
import { useNavigate } from 'react-router-dom';
const username = "AbbyBarber";


const AssignGroupChore  = () => {
    // State to store dropdown values
    // For kids dropdown
    const [kidDropValue, setKidDropValue] = useState('');
    //State to store kid
    const [kids, setKids] = useState([]);
    const [dueDate, setDueDate] = useState('');
    const [kidGroupChores, setKidGroupChores] = useState([]);
    //State for dynamic group
    const [lengthChoreGroup, setLengthChoreGroup] = useState({});
    const [selectedKidId, setSelectedKidId] = useState('');
    const[kidDropValueId,setKidDropValueId]=useState('');

    // Calendar Due date 
    const CalendarIcon = React.forwardRef(({ onClick }, ref) => (
        <button type="button" onClick={onClick} ref={ref}>
            <FaCalendarAlt />
        </button>
    ));

    //Kid dropdown

    useEffect(() => {
        fetch(`http://localhost:8080/api/groupassign/allkids?username=${username}`)
            .then(response => response.json())
            .then(data => {
                setKids(data);
                console.log('Fetched data:', data);
            })
            .catch(error => console.error('Error fetching kids:', error));
    }, []);


    useEffect(() => {
        fetch(`http://localhost:8080/api/groupassign/allkids?username=${username}`)
            .then(response => response.json())
            .then(kidsData => {
                const promises = kidsData.map(kid => {
                    return fetch(`http://localhost:8080/api/groupassign/allchores?kidId=${kid.kidId}`)
                        .then(response => response.json())
                        .then(choresData => ({
                            kidId: kid.kidId,
                            chores: choresData
                        }));
                });

                Promise.all(promises)
                    .then(kidsChores => {
                        const kidChoresMap = {};
                        kidsChores.forEach(kidChore => {
                            kidChoresMap[kidChore.kidId] = kidChore.chores;
                        });
                        setKidGroupChores(kidChoresMap);
                    })
                    .catch(error => {
                        console.error('Error fetching chores:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching kids:', error);
            });
    }, []);

    const handleDateChange = (date) => {
        setDueDate(date);
    };

    ///////Chore Group Dynamic Name Generation/////////////////////

    useEffect(() => {
        // Fetch data and calculate lengthChoreGroup
        const fetchedLengthChoreGroup = {};
        Object.entries(kidGroupChores)
            .filter(([_, chores]) => chores && chores.length !== 0)
            .forEach(([kidId, chores], index) => {
                // Generate group name dynamically
                fetchedLengthChoreGroup[kidId] = `Group ${index + 1}`;
            });
        // Set lengthChoreGroup state
        setLengthChoreGroup(fetchedLengthChoreGroup);
    }, [kidGroupChores]); // Trigger effect whenever kidGroupChores changes

    const handleKidSelect = (e) => {
        setSelectedKidId(e.target.value);
    };
    const handleKidDropValue = (e) => {
        setKidDropValue(e.target.value);
    };


    const handleSubmitGroup = (e) => {
        const formattedDueDate = dueDate.toISOString().split('T')[0];
      //  console.log("kidDropValueId"+kidDropValueId);
        console.log("selectedKidId"+selectedKidId);
        console.log("formattedDueDate"+formattedDueDate);   
        console.log("kidDropValue"+kidDropValue); 
        handleAssignGroupChore(selectedKidId, formattedDueDate, kidDropValue); 
    };

const navigate = useNavigate();
const handleAssignGroupChore = async (selectedKidId, dueDate, kidDropValue,) => {
    console.log("selectedKidId" + selectedKidId);
    console.log("kidDropValue" + kidDropValue);
    //const formattedDueDate = dueDate.toISOString().split('T')[0];
    const response = await fetch(`http://localhost:8080/insert?selectedKidId=${selectedKidId}&dueDate=${dueDate}&setKidDropValue=${kidDropValue}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Group Chore assigned successfully');
      navigate('/AssignGroupChore');
    } else {
      console.error('Failed to assign chore');
    }
  };
    return (
           <div>
            <h2>List of all the Chore Group</h2>

            <div>
                <option key="default" value="">Select a Kid:</option>
                <select
                    id="kidId"
                    value={kidDropValue}
                    onChange={handleKidDropValue}
                ><option value="">Select Kid</option>
                    {kids.map((kidAlone, index) => (
                        <option id={index} value={kidAlone.kidId}>{kidAlone.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <div>
                    <label>Select a Date:</label>
                    <DatePicker
                        id="dueDate"
                        selected={dueDate}
                        onChange={handleDateChange}
                        customInput={<CalendarIcon />}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                <div></div>
                <label>Chore Group:</label>
                <select
                    id="group-dropdown"
                    value={selectedKidId}
                    onChange={handleKidSelect}
                >
                    <option value="">Select</option>
                    {Object.entries(lengthChoreGroup).map(([kidId, groupName]) => (
                        <option key={kidId} value={kidId}>{groupName}</option>
                    ))}
                </select>
            </div>
            <div>
            </div>
            <div>
                <label > All Chores</label>
                {selectedKidId && kidGroupChores[selectedKidId] && (
                    <ul>
                        {kidGroupChores[selectedKidId].map(chore => (
                            <li key={chore.id}>{chore.description}</li>
                        ))}
                    </ul>

                )}
            </div>
            <button onClick={handleSubmitGroup}>Assign</button>
         
        </div>

    );
};

export default AssignGroupChore;