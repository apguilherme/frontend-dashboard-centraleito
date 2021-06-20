import React from 'react';
import { Pie } from 'react-chartjs-2';

export default function PieChart({ response }) {

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    if (response.data !== undefined && response.data.length > 0) {
      let male = 0;
      let female = 0;
      for (let bed of response.data[0].beds) {
        if (bed.sex === 'M') {
          male++;
        }
        else if (bed.sex === 'F') {
          female++;
        }
      }
      setData({
        labels: ['Mulher', 'Homem'],
        datasets: [
          {
            label: 'Sexo',
            data: [female, male],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });
    }
  }, []);

  return (
    <>
      <h2>Distribuição por sexo</h2>
      <div style={{height: '400px'}}>
        <Pie data={data} options={{
          responsive: true,
          maintainAspectRatio: false,
        }} />
      </div>
    </>
  )

};
