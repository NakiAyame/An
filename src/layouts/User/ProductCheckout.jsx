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
import { useNavigate } from 'react-router-dom';

const inputStyle = {
    width: '100%',
    boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 10%)',
    border: '1px solid #ddd', height: '2.507em',
    paddingLeft: '10px'
}

const tagPStyle = {
    marginBottom: '8px',
    fontWeight: 'bolder',
    marginTop: '20px'
}

export default function ProductCheckout() {

    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 5;

    const navigate = useNavigate();
    const context = useAuth();

    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [loged, setLoged] = useState(false)
    const [total, setTotal] = useState(0)

    const [recipientName, setRecipientName] = useState(' ')
    const [recipientPhoneNumber, setRecipientPhoneNumber] = useState(' ')
    const [deliveryAddress, setDeliveryAddress] = useState(' ')


    const checkoutProduct = async () => {
        // alert('Phần mềm đang được Hạnh Nguyên cập nhật')
        console.log(recipientName + ' ' + recipientPhoneNumber + ' ' + context.auth.token)
        try {
            const loadData = await axios.post(
                `http://localhost:3500/cartProduct/checkout`,
                {
                    recipientName: recipientName,
                    recipientPhoneNumber: recipientPhoneNumber,
                    deliveryAddress: deliveryAddress
                },
                {
                    headers: { 'Authorization': context.auth.token },
                    withCredentials: true
                }
            )
            .then((data) => {
                if(data.data.message === 'Checkout successful'){
                    toast.success("Đặt hàng sản phẩm thành công");
                    navigator('/product-purchase')
                }
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleLoadCartProduct = async () => {
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
                        totalPrice += loadData.data[i].quantity * (loadData.data[i].productId.price - (loadData.data[i].productId.price * loadData.data[i].productId.discount / 100))
                    }
                    setTotal(totalPrice);
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    useEffect(() => {
        handleLoadCartProduct()
    }, []);

    const numberToVND = (number) => {
        return number.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
        });
    };

    return (
        <Box sx={{ flexGrow: 1, marginTop: '100px', marginLeft: '50px', marginRight: '50px' }}>
            <h1>Đang Cập Nhật</h1>
            <Grid container spacing={5}>
                <Grid item xs={7}>
                    <h6 style={{ marginTop: '30px', fontWeight: 'bolder', fontSize: '18px' }}>THÔNG TIN THANH TOÁN</h6>

                    <p style={tagPStyle}>Họ và Tên *</p>
                    <input
                        type="text"
                        placeholder='Họ và tên'
                        style={inputStyle}
                        onChange={(e) => setRecipientName(e.target.value)}
                    ></input>

                    <p style={tagPStyle}>Địa chỉ *</p>
                    <input
                        type="text"
                        placeholder="Địa chỉ"
                        style={inputStyle}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                    ></input>

                    {/* <p style={ tagPStyle }>Tỉnh / Thành phố *</p>
                    <input type="text" placeholder="Địa chỉ" style={ inputStyle }></input> */}

                    <p style={tagPStyle}>Số điện thoại *</p>
                    <input
                        type="text"
                        placeholder="Số điện thoại"
                        style={inputStyle}
                        onChange={(e) => setRecipientPhoneNumber(e.target.value)}
                    ></input>
                </Grid>
                <Grid item xs={5}>
                    <h6 style={{ marginTop: '30px', fontWeight: 'bolder', fontSize: '18px' }}>ĐƠN HÀNG CỦA BẠN</h6>
                    <p>Mã giỏ hàng: <span></span></p>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p style={{ marginTop: '10px', fontWeight: 'bolder', fontSize: '15px' }}>SẢN PHẨM</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{ textAlign: 'right' }}>TỔNG</p>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p style={{ fontWeight: 'bolder' }}>Tạm tính</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{ color: '#cc2121', textAlign: 'right' }}>{numberToVND(total)}</p>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p style={{ fontWeight: 'bolder' }}>Giao hàng</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{ textAlign: 'right' }}>Giao hàng miễn phí</p>
                        </Grid>
                    </Grid>
                    <hr />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p style={{ fontWeight: 'bolder' }}>Tổng</p>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{ color: '#cc2121', textAlign: 'right' }}>{numberToVND(total)}</p>
                        </Grid>
                    </Grid>
                    <hr />
                    <input type="checkbox" />
                    <label style={{ fontWeight: 'bolder' }}>Trả tiền mặt khi nhận hàng</label><br />
                    <button style={{
                        cursor: 'pointer',
                        height: '40px',
                        border: 'none',
                        width: '30%',
                        backgroundColor: 'black',
                        color: 'white',
                        fontWeight: 'bolder',
                        marginTop: '20px'
                    }}
                        onClick={checkoutProduct}
                    >
                        ĐẶT HÀNG
                    </button>
                </Grid>
            </Grid>
        </Box>
    );
}
