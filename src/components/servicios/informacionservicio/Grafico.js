import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Grafico = ({ data }) => {
  return (
    <ResponsiveContainer  width="100%" height={200}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray=" 0 0" />
        <XAxis dataKey="name" fontSize="1rem" minTickGap="0"/>
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="Ingresos" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="Servicios" fill="#82ca9d" />
      </BarChart >
    </ResponsiveContainer>
  );
};

export default Grafico;
