import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import { Radio, RadioGroup } from "@mui/material";
import { styled } from "@mui/material/styles";
import Footer from "../../components/Footer/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const CustomContainer = styled(Container)({
  background:
    "linear-gradient(to bottom, #F4BEB2, #F4BEB2, #ECDAD6, #E5E6E7, #73A1CC)",
});

const defaultTheme = createTheme();

export default function UserPRofile() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassWord] = useState("");
  const [gender, setGender] = useState(false);
  const [role, setRole] = useState("");

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    console.log(gender);
  };

  const context = useAuth();
  console.log(context);

  // --------------------- HANDLE GET USER BY ID -----------------------------
  const handleGetUserById = async () => {
    try {
      const dataUser = await axios.get(
        `http://localhost:3500/user/${context.auth.id}`
      );
      if (dataUser.error) {
        toast.error(dataUser.error);
      } else {
        console.log(dataUser.data);
        setFullName(dataUser.data.fullname);
        setEmail(dataUser.data.email);
        setPhone(dataUser.data.phone);
        setAddress(dataUser.data.address);
        setGender(dataUser.data.gender);
        setPassWord(dataUser.data.password);
        setRole(dataUser.data.role);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetUserById();
  }, []);

  // --------------------- HANDLE UPDATE -----------------------------

  const handleUpdate = async (userId) => {
    console.log("Check userID", userId);
    console.log(gender);
    try {
      const data = await axios.patch(`http://localhost:3500/user`, {
        _id: userId,
        fullname: fullname,
        email: email,
        password: password,
        role: role,
        address: address,
        phone: phone,
        gender: gender,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        console.log(data);
        handleGetUserById();
        toast.success("Cập nhật thành công");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFullName(fullname);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
    setGender(gender);
    setPassWord(password);
    setRole(role);
  }, [fullname, email, password, phone, role, gender, address]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomContainer component="main" maxWidth="false" sx={{ pt: 13, pb: 4 }}>
        <CssBaseline />
        <Container maxWidth="sm">
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography variant="h6" gutterBottom>
              Thông tin cá nhân
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="Họ và tên"
                  fullWidth
                  value={fullname}
                  autoComplete="given-name"
                  variant="standard"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RadioGroup
                  value={gender}
                  onChange={handleGenderChange}
                  row
                  aria-label="gender"
                  name="gender"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Nữ"
                  />
                </RadioGroup>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="password"
                  name="password"
                  value={password}
                  label="Password"
                  autoComplete="shipping email"
                  variant="standard"
                  sx={{ display: "none" }}
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="rolle"
                  name="role"
                  value={role}
                  label="Password"
                  autoComplete="shipping email"
                  variant="standard"
                  sx={{ display: "none" }}
                  onChange={(e) => setRole(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  fullWidth
                  autoComplete="shipping email"
                  variant="standard"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address"
                  name="address"
                  label="Địa chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  autoComplete="shipping address"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phone"
                  name="phone"
                  label="Số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  autoComplete="shipping phone"
                  variant="standard"
                />
              </Grid>
            </Grid>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => handleUpdate(context.auth.id)}
                sx={{ mt: 3, ml: 1 }}
                variant="contained"
              >
                Cập nhật
              </Button>
            </Box>
          </Paper>
        </Container>
      </CustomContainer>
      <Footer />
    </ThemeProvider>
  );
}
