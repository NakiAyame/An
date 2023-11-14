import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import useAuth from '../../hooks/useAuth';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function CartService() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 5;

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0)

  const context = useAuth();
  console.log(context.auth)

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleProduct = () => {
    console.log(quantity)
  }


  const handleLoadCartService = async () => {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/cartService/view-cart`,
        {
          headers: { 'Authorization': context.auth.token },
          withCredentials: true
        }
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setData(loadData.data)
        toast.success("Login successful");
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    handleLoadCartService()
}, []);

  // ----------------------------------------------------------------
  const productStyle = {
    display: 'flex',
    justifyContent: 'space-around'
  }

  const cartHeader = {
    fontWeight: 'bolder',
    fontSize: '15px'
  }

  const quantityButtonRightStyle = {
    padding: '5px 12px',
    borderLeft: 'none',
    background: 'none'
  }

  const quantityButtonLeftStyle = {
    padding: '5px 12px',
    borderRight: 'none',
    background: 'none'
  }

  const quantityInputStyle = {
    padding: '5px',
    width: '20%',
    textAlign: 'center',
    borderRight: 'none',
    borderLeft: 'none'
  }

  return (
    <>
      <h1 style={{textAlign: 'center'}}>GIỎ HÀNG DỊCH VỤ</h1>
      <Card sx={{ minWidth: 275 }} style={{padding: '20px'}}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs>
                  DỊCH VỤ
                </Grid>
                <Grid item xs>
                  TÊN THÚ CƯNG
                </Grid>
                <Grid item xs>
                  GIÁ
                </Grid>
                <Grid item xs>
                  SỐ LƯỢNG
                </Grid>
                <Grid item xs>
                  TỔNG
                </Grid>
              </Grid>
              <hr />
              {
                data.map((value, index) => {
                  return (
                    <Grid container spacing={2} style={{padding: '10px 0'}}>
                      <Grid item xs>
                        {value.serviceId}
                      </Grid>
                      <Grid item xs>
                        {value.petId}
                      </Grid>
                      <Grid item xs>
                        GIÁ
                      </Grid>
                      <Grid item xs>
                        <button style={quantityButtonLeftStyle}>-</button>
                        <input type='text' style={quantityInputStyle} value={value.quantity} onChange={(e) => setQuantity(e.target.value)} />
                        <button onClick={() => handleProduct()} style={quantityButtonRightStyle}>+</button>
                      </Grid>
                      <Grid item xs>
                        TỔNG
                      </Grid>
                    </Grid>
                  )
                })
              }
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={3} style={{paddingBottom: '20px'}}>
                <Grid item xs>
                  TẤT CẢ
                </Grid>
                <Grid item xs>
                  PRICE
                </Grid>
              </Grid>
              <p>Phí vận chuyển được tính khi thanh toán</p>
              <button style={{color: 'pink', backgroundColor: 'black', width: '100%', padding: '15px 0'}}>CHECK OUT</button> 
            </Grid>
          </Grid>
        </Box>
        {/* <button onClick={() => handleTest()}>click</button> */}
      </Card>
    </>
  );
}