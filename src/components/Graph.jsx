import React from "react";
import Chart from "react-apexcharts";

const Graph = ({ options, series, height, type }) => {
  return (
    <Chart options={options} series={series} type={type} height={height} />
  );
};

export default Graph;
