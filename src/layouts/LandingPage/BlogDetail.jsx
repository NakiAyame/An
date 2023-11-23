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

const Image = styled("img")({
  maxWidth: "100%",
  maxHeight: 400,
});

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

      <CustomContainer component="main" maxWidth="full" sx={{ pt: 12 }}>
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
            <StyledBreadcrumb
              component={NavLink}
              to="/blog-homepage"
              label="Tin tức"
            />
            <StyledBreadcrumb label="Thông tin chi tiết" />
          </Breadcrumbs>
        </Container>
        <Container maxWidth="false" sx={{ pb: 3 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Box sx={{ flexGrow: 2, padding: 12 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Image
                    src={
                      blog.image !== undefined
                        ? `${blog.image}`
                        : "https://cdnimg.vietnamplus.vn/uploaded/mtpyelagtpy/2018_11_30/pet_1.jpg"
                    }
                    alt=""
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
                    <strong>{blog.title}</strong>
                  </Typography>
                  <Typography variant="h5">
                    <strong>{blog.content}</strong>
                  </Typography>
                  <Typography variant="body1">{blog.createdAt}</Typography>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </CustomContainer>

      {/* End footer */}
      <Footer />
    </ThemeProvider>
  );
};

export default BlogDetail;
