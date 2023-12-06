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
import {
  Box,
  Container,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import ChartDashBroad from "./Chart";
import DepositsDashboard from "./Deposits";
import OrdersDashboard from "./Orders";

export default function DashboardList() {
  const theme = useTheme();

  const drawerWidth = 240;

  return (
    <>
      <React.Fragment>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <ChartDashBroad />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <DepositsDashboard />
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <OrdersDashboard />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
    </>
  );
}
