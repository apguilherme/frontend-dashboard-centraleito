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
        if (bed.age !== ""){
          ages.push(bed.age);
        }
      };
      let labels = [...new Set(ages)];
      labels.sort();
      for (let age of labels){
        let count = ages.filter(x => x === age).length;
        let days = 0;
        ageCount.push(count);
        for (let bed of response.data[0]?.beds){
          if (bed.age === age){
            days += parseInt(bed.time_waiting);
          }
        }
        avgDays.push(days/count);
        console.log(days, count, days/count)
      }
      datasets.push(
        {
          type: 'line',
          label: 'Tempo internação',
          borderColor: `rgb(0, 0, 0)`,
          fill: false,
          data: avgDays,
          yAxisID: 'y-axis-1',
        },
      );
      datasets.push(
        {
          label: "Idade",
          data: ageCount,
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          yAxisID: 'y-axis-2',
        }
      );
      
      setData({ labels, datasets });
    }
  }, []);

  const options = {
    scales: {
      yAxes: [
        {
          type: 'bar',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          gridLines: {
            drawOnArea: false,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          gridLines: {
            drawOnArea: false,
          },
        },
      ],
    },
  };

  return (
    <Bar data={data} options={options} />
  )
};
