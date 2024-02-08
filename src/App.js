import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import React from 'react';
import AddChores from './components/chores/AddChores';
import UpdateChore from './components/chores/UpdateChore';
import ChoresList from './components/chores/ChoresList';
import AssignedChores from './components/chores/AssignedChores';
import RewardManagement from './components/rewards/RewardManagement';
import AddReward from './components/rewards/AddReward';
import EditReward from './components/rewards/EditReward';
import ParentDashboard from './components/chores/ParentDashboard';

// import AssignedChores from './AssignedChores';

function App() {
  return (
    <Routes>
      <Route path="/api/chores/add" element={<AddChores />} />
      <Route path="/api/chores/list" element={<ChoresList />} />
      <Route path="/api/assignments/assigned-chores" element={<AssignedChores />} />
      <Route path="/api/chores/edit/:choreId" element={<UpdateChore />} />
      <Route path="/allrewards" element={<RewardManagement />} />
      <Route path="/addRewards" element={<AddReward />} />
      <Route path="/editRewards/:rewardId" element={<EditReward />} />
      <Route path="/api/parent-dashboard" element={<ParentDashboard />} />
           </Routes>


  );
}
export default App;