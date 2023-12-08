import React, { useState } from "react";
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

export default function VerifyCode() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [verifyCode, setVerifyCode] = useState("");

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

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
                            navigate('/sign-in', { replace: true });
                        }

                    })
            } catch (error) {
                console.error("Error changing password:", error);
            }
        }
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }} style={{marginTop: '100px'}}>
            <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
            >
                <Typography variant="h4" gutterBottom>
                    Xác nhận tài khoản
                </Typography>
                <Typography variant="h7" gutterBottom>
                    Vui lòng kiểm tra mã xác nhận được gửi vào email
                </Typography>
                <Grid container spacing={3} style={{ marginTop: "15px" }}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Vui lòng nhập email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Grid>
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
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        type="button"
                        sx={{ mt: 3, ml: 1 }}
                        variant="contained"
                        onClick={handleConfirmVerifyCode}
                    >
                        Xác nhận
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

// export default VerifyCode;
