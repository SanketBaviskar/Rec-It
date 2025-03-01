import React from 'react';
import DashboardContent from './DashboardContent';

const Dashboard: React.FC = () => {
  console.log("Dashboard component rendered");
  return (
    <div className="dashboard-container">
      <DashboardContent />
    </div>
  );
};

export default Dashboard;
