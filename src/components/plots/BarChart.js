import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function VerticalBar({ response }) {

  const [data, setData] = React.useState([]);

  function colorGen() {
    var r = Math.floor(Math.random() * 255) + 1;
    var g = Math.floor(Math.random() * 255) + 1;
    var b = Math.floor(Math.random() * 255) + 1;
    return { r, g, b };
  }

  React.useEffect(() => {
    if (response.data !== undefined && response.data.length > 0) {
      let ages = [];
      let datasets = [];
      let ageCount = [];
      let avgDays = [];
      let color = colorGen();
      for (let bed of response.data[0]?.beds) {
        if (bed.age !== "") {
          ages.push(bed.age);
        }
      };
      let labels = [...new Set(ages)];
      labels.sort();
      for (let age of labels) {
        let count = ages.filter(x => x === age).length;
        let days = 0;
        ageCount.push(count);
        for (let bed of response.data[0]?.beds) {
          if (bed.age === age) {
            days += parseInt(bed.time_waiting);
          }
        }
        avgDays.push(days / count);
      }
      labels = labels.map(age => age + " anos");
      datasets.push(
        {
          type: 'line',
          label: 'Tempo médio internação (dias)',
          borderColor: `rgb(0, 0, 0)`,
          data: avgDays,
          yAxisID: 'y-axis-2',
        },
      );
      datasets.push(
        {
          type: 'bar',
          label: "Quantidade de internados",
          data: ageCount,
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          yAxisID: 'y-axis-1',
        }
      );

      setData({ labels, datasets });
    }
  }, []);

  const options = {
    scales: {
      'y-axis-1': {
        position: 'left',
        gridLines: {
          display: false
        },
        ticks: {
          stepSize: 1,
        },
      },
      'y-axis-2': {
        position: 'right',
        gridLines: {
          display: false
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <>
      <h2>Total por idade x Tempo médio internação</h2>
      <Bar data={data} options={options} />
    </>
  )
};
