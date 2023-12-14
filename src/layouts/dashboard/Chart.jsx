import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts";
import { Typography } from "@mui/material";
import Title from "./TittleDashboard";
import axios from "axios";
import { useEffect, useState } from "react";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// const dataRevenue = [
//   createData(1, 1),
//   createData(2, 2),
//   createData(3, 3),
//   createData(4, 4),
//   createData(5, 5),
//   createData(6, 6),
//   createData(7, 7),
//   createData(8, 8),
//   createData(9, 9),
//   createData(10, 10),
//   createData(11, 11),
//   createData(12, 1600800),
// ];

export default function ChartDashBroad() {

  const [revenue, setRevenue] = useState()

  async function revenueStatistics() {
    try {
      let dataRevenue = []
      await axios.get(`http://localhost:3500/dashboard/revenue-statistics`)
        .then((data) => {
          data.data.revenueByMonth.map((value)=>{
            dataRevenue.push(createData(value.month, value.total))
          })
          setRevenue(dataRevenue)
        })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    revenueStatistics();
  }, []);

  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>BIỂU ĐỒ DOANH THU CÁC THÁNG</Title>
      <ResponsiveContainer>
        <LineChart
          data={revenue}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
