import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   ResponsiveContainer,
// } from "recharts";
import {
  Box,
  Container,
  Grid,
  Paper,
  // Toolbar,
  // Typography,
} from "@mui/material";
import ChartDashBroad from "./Chart";
import DepositsDashboard from "./Deposits";
// import OrdersDashboard from "./Orders";
import { PieChart } from '@mui/x-charts/PieChart';

// import useAuth from "../../hooks/useAuth";

import axios from "axios";

import { useEffect, useState } from "react";

export default function DashboardList() {
  // const context = useAuth()

  // const theme = useTheme();

  // const drawerWidth = 240;

  const [data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [staff, setStaff] = useState(0);
  const [pet, setPet] = useState(0);

  async function loadAllOrder() {
    try {
      await axios.get(`http://localhost:3500/dashboard/order`)
        .then((data) => {
          let price = 0;

          data.data.totalOrders.map((value) => {
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
      await axios.get(`http://localhost:3500/dashboard/customer`)
        .then((data) => {
          let customer = 0;
          let staff = 0;

          data.data.map((value) => {
            if (value.role === 'customer') {
              customer++
            } else if (value.role === 'staff') {
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

  async function loadAllPet() {
    try {
      await axios.get(`http://localhost:3500/pet`)
        .then((data) => {
          console.log(data)
          setPet(data.data.total)
        })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllOrder();
    loadAllCustomer()
    loadAllPet()
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

            <Grid container spacing={1} style={{ margin: '20px 0' }}>
              <Grid item xs={6}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: customer, label: 'Khách hàng' },
                        { id: 1, value: pet, label: 'Thú cưng' },
                        // { id: 2, value: 20, label: 'series C' },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Grid>
              <Grid item xs={6}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'series A' },
                        { id: 1, value: 15, label: 'series B' },
                        { id: 2, value: 20, label: 'series C' },
                      ],
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Grid>
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
