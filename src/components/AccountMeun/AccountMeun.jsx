import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PetsIcon from "@mui/icons-material/Pets";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";

import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const context = useAuth();

  // --------------------- LOGOUT -----------------------------
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const response = await axios.post("http://localhost:3500/logout");
      // thông báo logout thành công và chuyển hướng về trang đăng nhập
      // console.log(response);

      localStorage.removeItem("token"); // xóa token lưu trữ trong localStorage
      navigate("/sign-in"); // chuyển hướng về trang đăng nhập
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose} component={NavLink} to="/">
          <ListItemIcon>
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Trang chủ
        </MenuItem>
        {context.auth.role === "admin" ? (
          <MenuItem onClick={handleClose} component={NavLink} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Bảng điều khiển
          </MenuItem>
        ) : (
          ""
        )}

        {context.auth.role === "admin" || context.auth.role === "customer" ? (
          <MenuItem
            onClick={handleClose}
            component={NavLink}
            to="/change-password"
          >
            <ListItemIcon>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            Đổi mật khẩu
          </MenuItem>
        ) : (
          ""
        )}

        {context.auth.role === "admin" || context.auth.role === "customer" ? (
          <MenuItem
            onClick={handleClose}
            component={NavLink}
            to="/user-profile"
          >
            <ListItemIcon>
              <AccountBoxIcon fontSize="small" />
            </ListItemIcon>
            Thông tin cá nhân
          </MenuItem>
        ) : (
          ""
        )}

        {context.auth.role === "admin" || context.auth.role === "customer" ? (
          <MenuItem onClick={handleClose} component={NavLink} to="/pet-user">
            <ListItemIcon>
              <PetsIcon fontSize="small" />
            </ListItemIcon>
            Thú cưng của tôi
          </MenuItem>
        ) : (
          ""
        )}

        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài đặt
        </MenuItem>
        {context.auth.role === "admin" || context.auth.role === "customer" ? (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Đăng xuất
          </MenuItem>
        ) : (
          ""
        )}
      </Menu>
    </React.Fragment>
  );
}
