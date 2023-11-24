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

export default function ProductPurchase() {
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
    textAlign: 'center',
    boxShadow: '0 -5px 10px #b3b3b3',
    paddingTop: '20px'
  }

  return (
    <>
      <h1 style={{ textAlign: 'center', marginTop: '100px' }}>SẢN PHẨM ĐÃ MUA</h1>
    </>
  );
}