import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ProductCheckout() {
    return (
        <Box sx={{ flexGrow: 1, marginTop: '100px', marginLeft: '20px', marginRight: '20px' }}>
            <Grid container spacing={5}>
                <Grid item xs={7}>
                    <h6 style={{ marginTop: '30px', fontWeight: 'bolder', fontSize: '18px' }}>THÔNG TIN THANH TOÁN</h6>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <p style={{ marginBottom: '8px', fontWeight: 'bolder' }}>Tên *</p>
                            <input id="lastname" type="text"
                                style={{
                                    width: '100%',
                                    boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 10%)',
                                    border: '1px solid #ddd',
                                    height: '2.507em'
                                }}></input>
                        </Grid>
                        <Grid item xs={6}>
                            <p style={{ marginBottom: '8px', fontWeight: 'bolder' }}>Họ *</p>
                            <input id="lastname" type="text"
                                style={{
                                    width: '100%',
                                    boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 10%)',
                                    border: '1px solid #ddd',
                                    height: '2.507em'
                                }}></input>
                        </Grid>
                    </Grid>
                    <p style={{ marginBottom: '8px', fontWeight: 'bolder', marginTop: '20px' }}>Địa chỉ *</p>
                    <input id="address" type="text" placeholder="Địa chỉ"
                        style={{
                            width: '100%',
                            boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 10%)',
                            border: '1px solid #ddd', height: '2.507em',
                            paddingLeft: '10px'
                        }}></input>

                    <p style={{ marginBottom: '8px', fontWeight: 'bolder', marginTop: '20px' }}>Tỉnh / Thành phố *</p>
                    <input id="address" type="text" placeholder="Địa chỉ"
                        style={{
                            width: '100%',
                            boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 10%)',
                            border: '1px solid #ddd', height: '2.507em',
                            paddingLeft: '10px'
                        }}></input>

                    <p style={{ marginBottom: '8px', fontWeight: 'bolder', marginTop: '20px' }}>Số điện thoại *</p>
                    <input id="address" type="text" placeholder="Địa chỉ"
                        style={{
                            width: '100%',
                            boxShadow: 'inset 0 1px 2px rgb(0 0 0 / 10%)',
                            border: '1px solid #ddd', height: '2.507em',
                            paddingLeft: '10px'
                        }}></input>
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
                            <p style={{ color: '#cc2121', textAlign: 'right' }}>65,432₫</p>
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
                            <p style={{ color: '#cc2121', textAlign: 'right' }}>65,432₫</p>
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
                    }}>
                        ĐẶT HÀNG
                    </button>
                </Grid>
            </Grid>
        </Box>
    );
}
