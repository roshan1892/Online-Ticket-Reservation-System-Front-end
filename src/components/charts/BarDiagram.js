import PropTypes from "prop-types";
import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarDiagram(props) {

  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.diagramLabel,
        data: props.data,
        backgroundColor: props.backgroundColor,
        hoverBackgroundColor: props.hoverBackgroundColor,
        borderWidth: props.borderWidth,
      }
    ]
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <Bar
        data={data}
        options={props.options}
      />
    </div>
  );
}

BarDiagram.propTypes = {
  label: PropTypes.string,
  labels: PropTypes.array,
  data: PropTypes.array,
  backgroundColor: PropTypes.array,
  hoverBackgroundColor: PropTypes.array,
  borderWidth: PropTypes.number,
  options: PropTypes.object
};

BarDiagram.defaultProps = {
  label: "",
  labels: [],
  data: [],
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
  borderWidth: 0,
  options: {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          suggestedMin: 0,
        }
      }]
    }
  }
};
