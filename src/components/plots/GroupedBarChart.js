import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function GroupedBar({ data }) {
  // const data = {
  //   labels: ['1', '2', '3', '4', '5', '6'],
  //   datasets: [
  //     {
  //       label: 'FAKE 1',
  //       data: [12, 19, 3, 5, 2, 3],
  //       backgroundColor: 'rgb(255, 99, 132)',
  //     },
  //     {
  //       label: 'FAKE 2',
  //       data: [2, 3, 20, 5, 1, 4],
  //       backgroundColor: 'rgb(54, 162, 235)',
  //     },
  //     {
  //       label: 'FAKE 3',
  //       data: [3, 10, 13, 15, 22, 30],
  //       backgroundColor: 'rgb(75, 192, 192)',
  //     },
  //   ],
  // };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Bar data={data} options={options} />
  )
}
