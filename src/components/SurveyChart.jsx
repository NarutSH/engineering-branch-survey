import React from "react";
import { Doughnut } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { optionsBranch } from "../data/constance";

const data = {
  labels: optionsBranch.map((data) => data.label),
  datasets: [
    {
      label: "Engineering Survey",
      data: [
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
        faker.number.int({ min: 10, max: 100 }),
      ],
      backgroundColor: optionsBranch.map((data) => data.color),
    },
  ],
};

const SurveyChart = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default SurveyChart;
