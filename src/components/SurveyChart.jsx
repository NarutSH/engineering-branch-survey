import React from "react";
import { Doughnut } from "react-chartjs-2";
import { optionsBranch } from "../data/constance";
import { getAllVotes } from "../api/crud";
import { useEffect } from "react";
import { useState } from "react";

const SurveyChart = () => {
  const [chartData, setChartData] = useState(null);

  const queryData = (voteArr, branchId) => {
    return (voteArr.filter((v) => v.branch_id === branchId) ?? [])?.reduce(
      (acc, v) => {
        return acc + v.point;
      },
      0
    );
  };

  const getData = async () => {
    try {
      const res = await getAllVotes();
      const { data } = res;

      const chrt = {
        labels: optionsBranch.map((data) => data.label),
        datasets: [
          {
            label: "Branch Survey",
            data: [
              queryData(data, 1),
              queryData(data, 2),
              queryData(data, 3),
              queryData(data, 4),
              queryData(data, 5),
              queryData(data, 6),
              queryData(data, 7),
              queryData(data, 8),
              queryData(data, 99),
            ],
            backgroundColor: optionsBranch.map((data) => data.color),
          },
        ],
      };

      setChartData(chrt);
    } catch (error) {
      console.warn(error);
      setChartData(null);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    <div>{chartData && <Doughnut data={chartData} options={options} />}</div>
  );
};

export default SurveyChart;
