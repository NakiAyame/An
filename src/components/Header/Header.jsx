import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import PetsIcon from "@mui/icons-material/Pets";
import { Outlet, useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Link from "@mui/material/Link";
import { NavLink } from "react-router-dom";
import AccountMenu from "../AccountMeun/AccountMeun";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import { useEffect } from "react";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

const CustomAppBar = styled(AppBar)({
  background: "linear-gradient(to right, #ADD8E6, #FFFF99, #FFC0CB)",
});

const pages = ["Trang Chủ", "Dịch vụ", "Sản Phẩm", "Blog", "Giới thiệu"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    console.log(localStorage.getItem("token"));
    setAnchorElUser(null);
  };

  // --------------------------------------------------

  const [serviceItem, setServiceItem] = React.useState(null);
  const handleClick = (e) => {
    setServiceItem(e.currentTarget);
  };
  const handleClose = () => {
    setServiceItem(null);
  };

  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  return (
    <>
      <CustomAppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <PetsIcon
              sx={{
                display: { xs: "none", md: "flex", color: "black" },
                mr: 1,
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex", color: "black" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              PetCare
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={NavLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                color: "black",
              }}
            >
              PetCare
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", color: "black" },
              }}
            >
              {/* ------------TRANG CHỦ--------------- */}
              <Button
                component={NavLink}
                to="/"
                exact
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                <Typography>Trang chủ</Typography>
              </Button>
              {/* ------------DỊCH VỤ--------------- */}
              <Button
                component={NavLink}
                to="service-homepage"
                exact
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                <Typography>Dịch vụ</Typography>
              </Button>

              {/* ------------SẢN PHẨM--------------- */}
              <Button
                component={NavLink}
                to="product-homepage"
                exact
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                <Typography>Sản phẩm</Typography>
              </Button>
              {/* ------------BLOG--------------- */}
              <Button
                component={NavLink}
                to="blog-homepage"
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                <Typography>Blog</Typography>
              </Button>
              {/* ------------GIỚI THIỆU--------------- */}
              <Button
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                Giới thiệu
                <Menu
                  id="service-menu"
                  anchorEl={serviceItem}
                  keepMounted
                  open={Boolean(serviceItem)}
                  onClose={handleClose}
                >
                  {/* ----------- THÊM ITEM DỊCH VỤ Ở ĐÂY ------------ */}
                  {/* ----------- NHỚ SỬA ĐƯỜNG DẪN TRONG HREF --------------- */}
                  <MenuItem>
                    <a
                      style={{ textDecoration: "none", color: "black" }}
                      href="service-homepage"
                    >
                      Tất cả dịch vụ
                    </a>
                  </MenuItem>
                </Menu>
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexGrow: 0,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Tooltip title="Giỏ hàng dịch vụ">
                  <NavLink to="cart-service">
                    <IconButton size="small" sx={{ ml: 2 }}>
                      <ShoppingBagIcon
                        sx={{ width: 32, height: 32 }}
                      ></ShoppingBagIcon>
                    </IconButton>
                  </NavLink>
                </Tooltip>
                <Tooltip title="Giỏ hàng sản phẩm">
                  <NavLink to="cart-product">
                    <IconButton size="small" sx={{ ml: 2 }}>
                      <ShoppingCartIcon
                        sx={{ width: 32, height: 32 }}
                      ></ShoppingCartIcon>
                    </IconButton>
                  </NavLink>
                </Tooltip>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                {!isLoggedIn && (
                  <Tooltip title="Đăng nhập">
                    <NavLink to="/sign-in">
                      <IconButton size="small" sx={{ ml: 2 }}>
                        <LoginIcon sx={{ width: 32, height: 32 }}></LoginIcon>
                      </IconButton>
                    </NavLink>
                  </Tooltip>
                )}
              </Box>
              {isLoggedIn && <AccountMenu />}
            </Box>
          </Toolbar>
        </Container>
      </CustomAppBar>
      {/* router here */}
      <Outlet />

      {/* <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {dummyMenuItems.map(item => (
                    <MenuItem onClick={handleClose} key={item.title} value={item.title}>
                        <a href='/'>{item.title}</a>
                    </MenuItem>
                ))}
            </Menu> */}
    </>
  );
}

export default Header;
