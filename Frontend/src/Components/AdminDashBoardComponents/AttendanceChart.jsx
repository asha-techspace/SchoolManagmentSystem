import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

const AttendanceChart = () => {
  // Register chart components
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Present',
        data: [100, 200, 150, 220, 170, 90],
        backgroundColor: '#0a4275',
      },
      {
        label: 'Absent',
        data: [20, 10, 30, 40, 20, 50],
        backgroundColor: '#ca1d1d',
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allows the chart to resize based on container dimensions
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Weekly Attendance',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-2 w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Attendance</h3>
      <div className="relative h-64 sm:h-80 md:h-96">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default AttendanceChart;
