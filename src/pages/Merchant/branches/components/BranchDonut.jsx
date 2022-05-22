import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '../../../../constants/constants';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 3,
        boxHeight: 3,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
};

export default function BranchDoghnut({ totalOrders, totalRevenue }) {
  const data = {
    labels: [formatCurrency(totalOrders), formatCurrency(totalRevenue)],
    datasets: [
      {
        label: 'ffffffff',
        data: [totalOrders, totalRevenue],
        backgroundColor: [
          'rgba(91, 147, 255, 1)',
          ' rgba(255, 214, 107, 1)',
          'rgba(45, 49, 95, 1)',
        ],
        borderColor: [
          'rgba(91, 147, 255, 1)',
          ' rgba(255, 214, 107, 1)',
          'rgba(45, 49, 95, 1)',
        ],
        borderWidth: 10,
        // background: rgba(91, 147, 255, 1);

        cutout: 80,
        // borderRadius: {
        //   outerStart: 50,
        //   innerStart: 50,
        //   innerEnd: -40,
        //   outerEnd: -40,
        // },

        borderRadius: [
          { outerStart: 50, innerStart: 50, innerEnd: 50, outerEnd: 50 },
          { outerStart: 50, innerStart: 50 },
          { outerStart: 50, innerStart: 50 },
        ],
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
}
