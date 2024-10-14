import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

const GenderChart = () => {
  
  // Register components for Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);
  
    const data = {
        labels: ['Boys', 'Girls'],
        datasets: [
          {
            label: 'Students by Gender',
            data: [1500, 1000],
            backgroundColor: ['#0a4275', '#ca1d1d'],
            hoverBackgroundColor: ['#0a4275', '#ca1d1d'],
          },
        ],
      };
    
      return (
        <div className="bg-white p-6 rounded shadow mt-2">
          <h3 className="text-lg font-semibold">Total Students by Gender</h3>
          <Doughnut data={data} />
        </div>
      );
}

export default GenderChart
