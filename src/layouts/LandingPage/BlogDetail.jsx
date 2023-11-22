import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
  Button,
  Toolbar,
  AppBar,
  CircularProgress,
  Backdrop,
  Paper,
  Divider,
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Footer from "../../components/Footer/Footer";
import MainPost from "../../components/MainPost.jsx/MainPost";
import { NavLink } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Avatar, CardActionArea, IconButton, Tooltip } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useAuth from "../../hooks/useAuth";
import ContentCus from "../../components/Typography/ContentCus";
import DateFormat from "../../components/DateFormat";
import axios from "axios";
import { toast } from "react-toastify";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const CustomContainer = styled(Container)({
  background:
    "linear-gradient(to bottom, #F4BEB2, #F4BEB2, #ECDAD6, #E5E6E7, #73A1CC)",
});

const BASE_URL = "http://localhost:3500";

const defaultTheme = createTheme();

const BlogDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

 

  // ----------------------------------- API GET ALL BLOG --------------------------------
  useEffect(() => {
    loadAllBlog();
  }, []);

  const loadAllBlog = async (page) => {
    try {
      const loadData = await axios.get(`${BASE_URL}/blog/${blogId}`);
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setBlog(loadData.data);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (!blog) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <CustomContainer component="main" maxWidth="full" sx={{ mt: 8 }}>
        {/* <MainPost post={mainPost} /> */}
        <Container
          maxWidth="full"
          sx={{
            bgcolor: "background.paper",
            p: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: "16px",
          }}
        >
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <StyledBreadcrumb
              component={NavLink}
              to="/"
              label="Trang chủ"
              icon={<HomeIcon fontSize="small" />}
            />
            {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
            <StyledBreadcrumb label="Tin tức" />
          </Breadcrumbs>
        </Container>
      </CustomContainer>

      {/* End footer */}
      <Footer />
    </ThemeProvider>
  );
};

export default BlogDetail;
