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
  maintainAspectRatio: false,

  tension: 0.4,
  plugins: {
    layout: {
      padding: {
        left: 50,
        top: 50,
        bottom: 50,
      },
    },
    legend: {
      display: true,
      position: 'top',
      align: 'center',
      labels: {
        boxWidth: 10,
        usePointStyle: true,
        pointStyle: 'circle',
        // padding: {
        //   top: 50,
        // },
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
