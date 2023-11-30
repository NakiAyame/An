import React, { useState, useEffect } from 'react';

import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    Paper,
    Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const PWD_REGEX = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");
    const [checkVerifyCode, setCheckVerifyCode] = useState(false);

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [seconds, setSeconds] = useState(60);
    const [isActive, setIsActive] = useState(false);

    const startCountdown = async () => {
        if (!email.match(validRegex)) {
            alert('Vui lòng nhập đúng định dạng Email !')
        } else {
            setIsActive(true);
            try {
                const response = await axios.post("http://localhost:3500/forgot-password",
                    {
                        email: email,
                    }
                )
                    .then((data) => {
                        console.log(data);
                    })
            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleConfirmVerifyCode = async () => {
        if (!email.match(validRegex)) {
            alert('Vui lòng nhập đúng định dạng Email !')
        } else {
            try {
                const response = await axios.post("http://localhost:3500/verify",
                    {
                        email: email,
                        code: verifyCode
                    }
                )
                    .then((data) => {
                        if (data.data.error === 'Fail') {
                            alert('Mã xác nhận không chính xác')
                        } else if (data.data === 'User Not Exists!') {
                            alert('Địa chỉ Email không tồn tại')
                        } else {
                            alert('Xác nhận tài khoản thành công, vui lòng đăng nhập');
                            setCheckVerifyCode(true)
                            // navigate('/sign-in', { replace: true });
                        }

                    })
            } catch (error) {
                console.error("Error changing password:", error);
            }
        }
    };

    useEffect(() => {
        let countdownInterval;

        if (isActive) {
            countdownInterval = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        clearInterval(countdownInterval);
                        setIsActive(false);
                        return 60; // Reset to 60 seconds when countdown reaches 0
                    } else {
                        return prevSeconds - 1;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(countdownInterval); // Cleanup interval on component unmount

    }, [isActive]);

    return (
        <>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }} style={{ marginTop: '100px' }}>
                <Paper
                    variant="outlined"
                    sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                >
                    <Typography variant="h4" gutterBottom>
                        Đặt lại mật khẩu
                    </Typography>
                    <Typography variant="h7" gutterBottom>
                        Vui lòng kiểm tra mã xác nhận được gửi vào email
                    </Typography>
                    <Grid container spacing={3} style={{ marginTop: "15px" }}>
                        <Grid item xs={9}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Vui lòng nhập email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <button style={{ width: '100%', height: '100%' }} onClick={startCountdown} disabled={isActive}>
                                Verify {isActive && <div>Countdown: {seconds}s</div>}
                            </button>
                        </Grid>
                        {

                            checkVerifyCode === false
                                ?
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Vui lòng nhập mã xác nhận"
                                            type="text"
                                            value={verifyCode}
                                            onChange={(e) => setVerifyCode(e.target.value)}
                                        />
                                    </Grid>
                                    < Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            type="button"
                                            sx={{ mt: 3, ml: 1 }}
                                            variant="contained"
                                            onClick={handleConfirmVerifyCode}
                                        >
                                            Xác nhận
                                        </Button>
                                    </Box>
                                </>
                                : ''
                        }

                        {/* ---------------------------------------------------------------------------------------- */}
                        {
                            checkVerifyCode === true
                                ?
                                <>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Vui lòng nhập mật khẩu"
                                            type="text"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Vui lòng nhập lại mật khẩu"
                                            type="text"
                                            value={rePassword}
                                            onChange={(e) => setRePassword(e.target.value)}
                                        />
                                    </Grid>
                                    < Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                        <Button
                                            type="button"
                                            sx={{ mt: 3, ml: 1 }}
                                            variant="contained"
                                            onClick={handleConfirmVerifyCode}
                                        >
                                            Xác nhận
                                        </Button>
                                    </Box>
                                </>
                                : ''
                        }
                        {/* ------------------------------------------------------------------------------------------ */}
                    </Grid>
                </Paper>
            </Container >
        </>

    );
};

export default ResetPassword;
