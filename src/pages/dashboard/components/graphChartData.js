export const labels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const options = {
  responsive: true,
  tension: 0.4,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      align: 'end',

      labels: {
        boxWidth: 8,
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
    // tooltip: {
    //   enabled: true,
    // },

    // title: {
    //   display: true,
    //   text: 'Chart.js Line Chart',
    // },
  },

  scales: {
    y: {
      display: true,
      ticks: {
        // beginAtZero:true,
        display: false,
      },
    },
  },
};
