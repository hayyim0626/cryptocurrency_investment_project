import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";

export default function Chart() {
  const interestData = useSelector((store) => store.entireDataReducer);

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
    // labels: interestData.monthlyData.map((el) => el.date),
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
        // data: interestData.monthlyData.map((el) => el.interest),
        data: [
          3,
          4,
          7,
          5,
          5,
          8,
          2,
          5,
          3,
          5,
          7,
          7,
          3,
          4,
          1,
          2,
          3,
          4,
          5,
          7,
          8,
          3,
          3,
          4,
          5,
          7,
          8,
          6,
          4,
        ],
      },
    ],
  };

  return (
    <>
      <Line data={data} width={500} height={230} options={options} />
    </>
  );
}
