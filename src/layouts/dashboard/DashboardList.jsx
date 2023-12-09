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

import useAuth from "../../hooks/useAuth";

import axios from "axios";

import { useEffect, useState } from "react";

export default function DashboardList() {
  const context = useAuth()

  const theme = useTheme();

  const drawerWidth = 240;

  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [staff, setStaff] = useState(0);

  async function loadAllOrder() {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/dashboard/order`
      )
        .then((data) => {
          let price = 0;

          data.data.totalOrders.map((value, index) => {
            if (value.status === 'Đã nhận hàng') price += value.totalPrice
          })
          setTotalPrice(price)
          setData(data.data.totalOrders)
          console.log(data.data);

        })
    } catch (err) {
      console.log(err);
    }
  }

  async function loadAllCustomer() {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/dashboard/customer`
      )
        .then((data) => {
          let customer = 0;
          let staff = 0;

          data.data.map((value, index) => {
            if (value.role === 'customer') {
              customer++
            } else if(value.role === 'staff'){
              staff++
            }
          })
          setCustomer(customer)
          setStaff(staff)
          console.log(data.data);

        })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllOrder();
    loadAllCustomer()
  }, []);


  return (
    <>
      <React.Fragment>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Chart */}
            {/* <Grid item xs={12} md={8} lg={9}>
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
            </Grid> */}
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
                <DepositsDashboard props={totalPrice} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <DepositsDashboard total={data.length} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <DepositsDashboard customer={customer} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <DepositsDashboard staff={staff} />
              </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
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
          </Grid>
        </Container>
      </React.Fragment>
    </>
  );
}
