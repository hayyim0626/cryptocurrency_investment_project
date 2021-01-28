import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function Chart({ clickedCurrency }) {
  const interestData = useSelector((store) => store.entireDataReducer);
  console.log(clickedCurrency)
  console.log(interestData)
  console.log()
  const options = {
    legend: {
      display: true,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
  };

  const data = {
    labels: interestData.find(el => el.id === clickedCurrency)?.monthlyData.map(el=> el.date),
    datasets: [
      {
        label: "Aave",
        fill: false,
        lineTension: 0.4,
        backgroundColor: "rgb(9, 0, 108)",
        borderColor: " rgb(9, 0, 108)",
        borderJoinStyle: "miter",
        pointBorderColor: " rgb(9, 0, 108)",
        pointBackgroundColor: "rgb(9, 0, 108)",
        pointBorderWidth: 1,
        pointHoverRadius: 2,
        pointHoverBackgroundColor: " rgb(9, 0, 108)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 1,
        pointRadius: 2,
        pointHitRadius: 1,
        data: interestData.find(el => el.id === clickedCurrency)?.monthlyData.map(el=> el.interest),
      },
    ],
  };

  return (
    <>
      <Line data={data} width={500} height={230} options={options} />
    </>
  );
}
