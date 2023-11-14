import React, { useState } from "react";
import { TextField, Button, Container, Typography, Grid } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import useAuth from "../../hooks/useAuth";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const context = useAuth();
  console.log(context);

  const handleChangePassword = async () => {
    try {
      const response = await axios.put("http://localhost:3500/changePassword", {
        id: context.auth.id,
        oldPassword: oldPassword,
        newPassword: newPassword,
        rePassword: rePassword,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Đổi mật khẩu
        </Typography>
        <form>
          <Grid container spacing={2}>
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
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleChangePassword}
          >
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ChangePassword;
