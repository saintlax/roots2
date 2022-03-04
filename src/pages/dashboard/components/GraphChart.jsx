import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { labels, options } from './graphChartData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const GraphChart = () => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: [
          2200, 5700, 5674, 12382, 6842, 7273, 1893, 7355, 5384, 7832, 8323,
          4323,
        ],
        borderColor: '#1F9C3A',
        backgroundColor: 'rgba(31,156,58, 0.15)',
        pointRadius: 3,
        pointHoverRadius: 5,
        fill: true,
      },
      {
        label: 'Withdrawals',
        data: [
          5300, 8900, 8254, 1382, 1242, 6473, 5923, 1035, 224, 5932, 2833, 9823,
        ],
        borderColor: 'rgba(236, 103, 96, 1)',
        backgroundColor: 'rgba(236, 103, 96, 0.15)',
        pointRadius: 3,
        fill: true,
      },
    ],
  };

  return (
    <Box bg='#fff' p='5' borderRadius='10'>
      <Line data={data} options={options} redraw={true} />
    </Box>
  );
};

export default GraphChart;
