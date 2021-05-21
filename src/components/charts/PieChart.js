import React from "react";
import { Pie } from "react-chartjs-2";
import PropTypes from "prop-types";
export default function PieChart(props) {
  const data = {
    labels: props.labels,
    datasets: [
      {
        data: props.chartData,
        backgroundColor: props.backgroundColor,
        hoverBackgroundColor: props.hoverBackgroundColor,
      }
    ]
  };

  return (
    <Pie data={data} />
  );
}

PieChart.propTypes = {
  backgroundColor: PropTypes.array,
  hoverBackgroundColor: PropTypes.array,
  labels: PropTypes.array,
  chartData: PropTypes.array,

};

PieChart.defaultProps = {
  backgroundColor: [
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#2196f3",
    "#ff5722",
    "#009688",
    "#3f51b5",
  ],
  hoverBackgroundColor: [
    "#d32f2f",
    "#c2185b",
    "#7b1fa2",
    "#1976d2",
    "#e64a19",
    "#00796b",
    "#303f9f",
  ],
  labels: [],
  chartData: []
};
