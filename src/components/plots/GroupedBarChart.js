import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function GroupedBar({ response }) {

  const [data, setData] = React.useState([]);

  function colorGen() {
    var r = Math.floor(Math.random() * 255) + 1;
    var g = Math.floor(Math.random() * 255) + 1;
    var b = Math.floor(Math.random() * 255) + 1;
    return { r, g, b };
  }

  React.useEffect(() => {
    if (response.data !== undefined && response.data.length > 0) {
      let emptyBeds = 0;
      for (let bed of response.data[0]?.beds) {
        if (bed.name === "") {
          emptyBeds += 1;
        }
      };
      let labels = ["Total leitos", "Leitos ocupados", "Leitos livres"];
      let color = colorGen();
      let datasets = [
        {
          label: response.data[0]?.name,
          data: [response.data[0]?.beds.length, response.data[0]?.beds.length - emptyBeds, emptyBeds],
          backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`
        }
      ];
      setData({ labels, datasets });
    }
  }, []);


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
    <>
    <h2>Leitos Ocupados x Livres</h2>
    <Bar data={data} options={options} />
    </>
  )
}
