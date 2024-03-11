import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import '../../styles/AssignGroup.css';
//import { useNavigate } from 'react-router-dom';
import ApiCall from '../api/ApiCall.js'
const username = "AbbyBarber";


const AssignGroupChore = () => {
    // State to store dropdown values
    // For kids dropdown
    const [kidDropValue, setKidDropValue] = useState('');
    //State to store kid
    const [kids, setKids] = useState([]);
    const [dueDate, setDueDate] = useState(null);
    const [kidGroupChores, setKidGroupChores] = useState([]);
    //State for dynamic group
    const [lengthChoreGroup, setLengthChoreGroup] = useState({});
    const [selectedKidId, setSelectedKidId] = useState('');
    //State for max date,data
   // const [maxStatus, setMaxStatus] = useState(null);
    const [maxDueData, setMaxDueData] = useState({});
    const [maxDueDate, setMaxDueDate] = useState(null);
    //Successful message.
    //const [Oksuccess, setOkSuccess] = useState('');
    //const[successStatus,setSucessStatus]=useState(false);
    // Calendar Due date 
    const CalendarIcon = React.forwardRef(({ onClick }, ref) => (
        <button type="button" onClick={onClick} ref={ref}>
            <FaCalendarAlt />
        </button>
    ));

    //Kid for whom we need to assign the chore Selection dropdown

    useEffect(() => {
        fetch(`http://localhost:8080/api/groupassign/allkids?username=${username}`)
            .then(response => response.json())
            .then(data => {
                setKids(data);
                console.log('Fetched data:', data);
            })
            .catch(error => console.error('Error fetching kids:', error));
    }, []);

    //To get the data of all kids for that parent id
    //This we will use for getting max date
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
                        //This is the data i want to take to get the max date.
                        setMaxDueData(kidChoresMap);
                    })
                    .catch(error => {
                        console.error('Error fetching chores:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching kids data:', error);
            });
    }, []);

    //To get the max_date for that particular parentid
    useEffect(() => {
        const allParentData = Object.values(maxDueData).flat();

        if (allParentData.length > 0) {
            const maxDate = new Date(Math.max(...allParentData.map(chore => new Date(chore.dueDate))));
            const maxDateChanged = (maxDate.toISOString().split('T')[0]);
            // console.log("Inside maxDateChanged"+maxDateChanged);
            setMaxDueDate(maxDateChanged);
        }

    }, [maxDueData, maxDueDate]);


    console.log("maxDueDate" + maxDueDate);
    console.log("maxDueDatetypeof" + typeof maxDueDate);
    //From the parent get the kid id 
    //The second fetches the Chores data.
    //The third is used for group by kid. 

    useEffect(() => {
        if (maxDueDate !== null) {
            fetch(`http://localhost:8080/api/groupassign/allkids?username=${username}`)
                .then(response => response.json())
                .then(kidsData => {
                    const promises = kidsData.map(kid => {
                        return fetch(`http://localhost:8080/api/groupassign/allchoresdate?kidId=${kid.kidId}&maxDate=${maxDueDate}`)
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
        }
    }, [maxDueDate]);

    const handleDateChange = (data) => {
        setDueDate(data);
    };

    ///////Chore Group Dynamic Name Generation/////////////////////
    useEffect(() => {
        // Fetch data and calculate lengthChoreGroup
        const fetchedLengthChoreGroup = {};
        Object.entries(kidGroupChores)
            .filter(([_, chores]) => chores && chores.length !== 0)
            .forEach(([kidId, chores], index) => {
                // Generate group name dynamically
                fetchedLengthChoreGroup[kidId] = `Chore Group ${index + 1} `;
            });
        // Set lengthChoreGroup state
        setLengthChoreGroup(fetchedLengthChoreGroup);
    }, [kidGroupChores]);

    const handleKidSelect = (e) => {
        setSelectedKidId(e.target.value);
    };
    const handleKidDropValue = (e) => {
        setKidDropValue(e.target.value);
      //  setSucessStatus(false);
    };


    const handleSubmitGroup = (e) => {
        //This will stop from the refresh of the page.
        e.preventDefault(); 
        const formattedDueDate = dueDate.toISOString().split('T')[0];
       // const formattedMaxDueDate = maxDueDate.toISOString().split('T')[0];
        //  console.log("kidDropValueId"+kidDropValueId);
        console.log("selectedKidId" + selectedKidId);
        console.log("formattedDueDate" + formattedDueDate);
        console.log("kidDropValue" + kidDropValue);
        handleAssignGroupChore(selectedKidId, formattedDueDate, kidDropValue,maxDueDate);
    };

    //const navigate = useNavigate();
    //////Note:selectedKidId Contains the kid_id whose chores we have made as an group.
    //////Note:kidDropValue Contains the kid_id for whom we are making an entry in the chores.
    const handleAssignGroupChore = async (selectedKidId, dueDate, kidDropValue,maxDueDate) => {
        console.log("selectedKidId" + selectedKidId);
        console.log("kidDropValue" + kidDropValue);
        const response = await fetch(`http://localhost:8080/insert?selectedKidId=${selectedKidId}&dueDate=${dueDate}&setKidDropValue=${kidDropValue}&maxDueDate=${maxDueDate}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Group Chore assigned successfully');
          //  setOkSuccess('Group Chore assigned successfully');
            // setSucessStatus(true);
          // navigate('/api/assignGroupChore');
        } else {
            console.error('Failed to assign chore');
        }
    };
    return (
      
        <div className='assign-group'>
                <h2 className='header-group'>List of all the Chore Group</h2>
                <form className='form-display'>
                <div className='container'>
                    <div className='column'>
                        {/*Kid Selection Dropdown.*/}
                        <option key="default" value="" className='form-selectheader'>Select a Kid:</option>
                        <select
                            id="kidId"
                            value={kidDropValue}
                            onChange={handleKidDropValue}
                            className="form-select"
                        ><option value="">Select Kid</option>
                            {kids.map((kidAlone, index) => (
                                <option id={index} value={kidAlone.kidId}>{kidAlone.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className='column'>
                        <div>
                            <label className='form-selectheader'>Select a Date:</label>
                            {/*Date Selection*/}

                            <DatePicker
                                id="dueDate"
                                className="form-select-date"
                                selected={dueDate}
                                onChange={handleDateChange}
                                customInput={<CalendarIcon />}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>

                        {/*Integrated with the Public Holiday API*/}
                        {dueDate && <ApiCall dueDate={dueDate} />}
                        
                        {/*Chore Group Selection Dropdown.*/}
                        <label className='form-selectheader'>Chore Group:</label>
                        <select
                            id="group-dropdown"
                            value={selectedKidId}
                            onChange={handleKidSelect}
                            className="form-select"
                        >
                            <option value="">Select</option>
                            {Object.entries(lengthChoreGroup).map(([kidId, groupName]) => (
                                <option key={kidId} value={kidId}>{groupName}</option>
                            ))}

                        </select>
                    </div>

                    <div className='column'>
                        {/*The corresponding Chore Group.*/}
                        <label className='form-selectheader'> All Chores</label>
                        {selectedKidId && kidGroupChores[selectedKidId] && (
                            <ul>
                                {kidGroupChores[selectedKidId].map(chore => (
                                    <li key={chore.id}>{chore.description}</li>
                                ))}
                            </ul>
                        )}
                        {/*After the selection it will still stay in the same page and im not reseting as if i re-set then the date value will get changed.*/}
                    </div>
                    <button className="button-assign" onClick={handleSubmitGroup}>Assign</button>
                </div>

                
            </form>

           {/* {Oksuccess && <p className='sucess'>{Oksuccess}</p>}*/}
           
        </div>
    );
};

export default AssignGroupChore;