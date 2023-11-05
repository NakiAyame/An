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

  return (
    <>
      <CustomAppBar position="static">
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
              component="a"
              href="landing-page"
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
              component="a"
              href="landing-page"
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
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                Trang chủ
              </Button>
              {/* ------------DỊCH VỤ--------------- */}
              <Button
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                <Typography>Dịch vụ</Typography>
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

              {/* ------------SẢN PHẨM--------------- */}
              <Button
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                Sản phẩm
              </Button>
              {/* ------------BLOG--------------- */}
              <Button
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                Blog
              </Button>
              {/* ------------GIỚI THIỆU--------------- */}
              <Button
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block", color: "black" }}
              >
                Giới thiệu
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
