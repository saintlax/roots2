import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box, Text } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['20,000', '10,000', '15,000'],
  datasets: [
    {
      label: 'ffffffff',
      data: [400, 190, 320],
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        boxWidth: 3,
        boxHeight: 3,
        usePointStyle: true,
        pointStyle: "circle",
       
      },
    },
  },
};

export default function Doghnut() {
  return (
    <Box px="0 !important" position={"relative"} left="-15%">
      <Doughnut data={data} options={options} />
      </Box>
  );
}
