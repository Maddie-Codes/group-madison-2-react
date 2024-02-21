import React,  { useState, useEffect }  from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../axios_helper';
import Kid from '../kid/KidChores';
import { containerStyles } from './DollarStyles';
import {inputStyles} from './DollarStyles';

import 'bootstrap/dist/css/bootstrap.min.css';

const DollarManagement = (props) => {

  const [availableDollars, setAvailableDollars] = useState(props.dollars);
  const [claimDollars, setClaimDollars] = useState();
  const [goToTasks, setGoToTasks] = useState(false);

  const onChangeDollarHandler = (event) => {
    setClaimDollars(event.target.value)
};

  const config = {
    headers: { Authorization: getAuthToken() }
};

const goBackToTasks = ()=>{
  setGoToTasks(true);
}

  const onSubmitDollarClaim = ()=>{
    if(claimDollars>availableDollars){
      window.alert("Entered dollar value : "+claimDollars+" which is greater than available dollar value : "+availableDollars)
    }
    else{

    axios.put('http://localhost:8080/api/dollars/claim/'+claimDollars+'/'+props.kidId,null,config)
.then(function (response) {
  setAvailableDollars(response.data.dollars)
  alert("Claimed dollars successfully");
  setClaimDollars();
})
.catch(function (error) {
  console.log(error);
})
    }
  }
  if(goToTasks){
    return (<Kid userName={props.userName}></Kid>)
  }
  return (
    <div> 
      <div className="container" style={containerStyles}>
      <h2 className='text-center'>Available Dollars : {availableDollars}</h2>
                    <div className='form-outline mb-4'>
                        <input type='text input-lg' id='claimDollars' name='claimDollars'  value={claimDollars} className='form-control' onChange={onChangeDollarHandler} style={inputStyles} />
                        <label className='form-label'>Enter Dollars tobe Claimed</label>
                        

                    </div>
      
                    <div className='row justify-content-center d-grid gap-2 col-6 mx-auto'>
                            <button onClick={onSubmitDollarClaim} style={inputStyles}className='btn btn-warning mr-2' type='submit'>Claim</button> 
                            <button className='btn btn-primary mb-2' onClick= {()=>{goBackToTasks()}}>Go To Tasks</button>   
                    </div>
    </div>
  
    </div>
  );
};

export default DollarManagement;