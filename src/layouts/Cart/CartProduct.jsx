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

export default function CartProduct() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 5;

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0)
  const [loged, setLoged] = useState(false)
  const [total, setTotal] = useState(0)

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
    if (context.auth.token !== undefined) {
      setLoged(true)
      try {
        const loadData = await axios.get(
          `http://localhost:3500/cartProduct/view-cart`,
          {
            headers: { 'Authorization': context.auth.token },
            withCredentials: true
          }
        );
        if (loadData.error) {
          toast.error(loadData.error);
        } else {
          setData(loadData.data)
          console.log(loadData.data);
          let totalPrice = 0;
          for (let i = 0; i < loadData.data.length; i++) {
            totalPrice += loadData.data[i].quantity * loadData.data[i].productId.price
          }
          setTotal(totalPrice);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    handleLoadCartService()
  }, []);

  // ----------------------------------------------------------------

  const handleCheckOut = async () => {
    if (window.confirm('Bạn có muốn đặt sản phẩm này ?') == true) {
      if (data.length === 0) {
        alert('Bạn không có sản phẩm trong giỏ hàng')
      } else {
        try {
          const checkout = await axios.get(
            `http://localhost:3500/cartProduct/checkout`,
            {
              headers: { 'Authorization': context.auth.token },
              withCredentials: true
            }
          )
            .then((data) => {
              alert('Đặt sản phẩm thành công')
              handleLoadCartService()
            })

        } catch (err) {
          console.log(err);
        }
      }
    }
  }

  // ----------------------------------------------------------------
  const productStyle = {
    padding: '16px 0',
    marginTop: '0',
    border: '1px solid rgba(0, 0, 0, .2)'
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
  const checkout = {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: 'white',
    // color: 'white',
    textAlign: 'center'
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '100px' }}>GIỎ HÀNG SẢN PHẨM</h1>
      <Card sx={{ minWidth: 275 }} style={{ padding: '20px', margin: '0 50px', boxShadow: 'none' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} style={{ border: '1px solid rgba(0, 0, 0, .2)', paddingBottom: '16px' }}>
                <Grid item xs={4}>
                  SẢN PHẨM
                </Grid>
                <Grid item xs style={{ textAlign: 'center' }}>
                  ĐƠN GIÁ
                </Grid>
                <Grid item xs>
                  SỐ LƯỢNG
                </Grid>
                <Grid item xs>
                  SỐ TIỀN
                </Grid>
                <Grid item xs={1}>
                  THAO TÁC
                </Grid>
              </Grid>
              {
                loged === false
                  ? <h3 style={{ textAlign: 'center' }}>VUI LÒNG ĐĂNG NHẬP</h3>
                  : data.length === 0
                    ? <h3 style={{ textAlign: 'center' }}>KHÔNG CÓ SẢN PHẨM TRONG GIỎ HÀNG</h3>
                    : data.map((value, index) => {
                      return (
                        <Grid container spacing={2} style={productStyle}>
                          <Grid item xs={4}>
                            {value.productId.productName}
                          </Grid>
                          <Grid item xs style={{ textAlign: 'center' }}>
                            {(value.productId.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </Grid>
                          <Grid item xs>
                            <button style={quantityButtonLeftStyle}>-</button>
                            <input type='text' style={quantityInputStyle} value={value.quantity} onChange={(e) => setQuantity(e.target.value)} />
                            <button onClick={() => handleProduct()} style={quantityButtonRightStyle}>+</button>
                          </Grid>
                          <Grid item xs style={{ color: 'red' }}>
                            {(value.productId.price * value.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                          </Grid>
                          <Grid item xs={1}>
                            Xoá
                          </Grid>
                        </Grid>
                      )
                    })
              }
            </Grid>
          </Grid>
        </Box>
        <Grid item xs={12} style={checkout}>
          <Grid container spacing={3} style={{ paddingBottom: '20px' }}>
            <Grid item xs>
              TẤT CẢ
            </Grid>
            <Grid item xs>
              {total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
            </Grid>
          </Grid>
          <p>Phí vận chuyển được tính khi thanh toán</p>
          <button onClick={() => handleCheckOut()} style={{ color: 'pink', backgroundColor: 'black', width: '100%', padding: '15px 0' }}>CHECK OUT</button>
        </Grid>
        {/* <button onClick={() => handleTest()}>click</button> */}
      </Card>
    </>
  );
}