import React from "react";
import { Bar } from "react-chartjs-2";
import { optionsBranch } from "../data/constance";

const HorizontalBarChart = ({ reponseData = [] }) => {
  const queryData = (voteArr, branchId) => {
    return (voteArr.filter((v) => v.branch_id === branchId) ?? [])?.reduce(
      (acc, v) => {
        return acc + v.point;
      },
      0
    );
  };

  const newData = optionsBranch.map((option) => {
    return {
      ...option,
      qty: queryData(reponseData, option.id),
    };
  });

  const sortData = [...newData].sort((a, b) => {
    return b.qty - a.qty;
  });

  const chartData = {
    labels: sortData.map((data) => data.label),
    datasets: [
      {
        label: "ผลการโหวตเลือกสาขา",
        data: sortData.map((data) => data.qty),
        backgroundColor: sortData.map((data) => data.color),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "ผลการโหวตเลือกสาขา",
      },
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return <Bar data={chartData} options={options} />;
};

export default HorizontalBarChart;
