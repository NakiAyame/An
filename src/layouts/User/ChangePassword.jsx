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
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Footer from "../../components/Footer/Footer";

const CustomContainer = styled(Container)({
  background:
    "linear-gradient(to bottom, #F4BEB2, #F4BEB2, #ECDAD6, #E5E6E7, #73A1CC)",
});

const defaultTheme = createTheme();

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const navigate = useNavigate();

  const context = useAuth();
  console.log(context);

  const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

  const handleChangePassword = async () => {
    if (newPassword !== rePassword) {
      toast.error(
        "Mật khẩu Mới và Xác nhận phải khớp nhau. Vui lòng nhập lại chúng. "
      );
    } else {
      try {
        const response = await axios.put(
          "http://localhost:3500/changePassword",
          {
            id: context.auth.id,
            oldPassword: oldPassword,
            newPassword: newPassword,
            rePassword: rePassword,
          }
        );
        if (response.data.error) {
          console.error("Error changing password:", response.data.error);
          toast.error("Mật khẩu cũ không chính xác");
        } else {
          console.log(response.data);
          toast.success("Đổi mật khẩu thành công");
          // navigate("/sign-in");
          // localStorage.removeItem("token");
          // toast.success("Hãy đăng nhập lại");
        }
      } catch (err) {
        console.error("Error changing password:", err);
        toast.error(err);
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomContainer component="main" maxWidth="false" sx={{ pt: 16, pb: 4 }}>
        <Container maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography component="h1" variant="h6" gutterBottom>
              Đổi mật khẩu
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Mật khẩu cũ"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Mật khẩu mới"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Nhập lại mật khẩu mới"
                  type="password"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="button"
                sx={{ mt: 3, ml: 1 }}
                variant="contained"
                onClick={handleChangePassword}
              >
                Đổi mật khẩu
              </Button>
            </Box>
          </Paper>
        </Container>
      </CustomContainer>
      <Footer />
    </ThemeProvider>
  );
};

export default ChangePassword;
