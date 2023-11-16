import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
// Axios
import axios from "axios";
import { toast } from "react-toastify";
import ButtonCustomize from "../../../components/Button/Button";

//@material-ui/core
import { styled } from "@mui/material/styles";
import ScrollableTabService from "../../../components/ScrollableTab/TabService";
import ProductDetail from "../../../components/Modal/ModalDetailProduct";
import Footer from "../../../components/Footer/Footer";
import MainPost from "../../../components/MainPost.jsx/MainPost";
import useAuth from "../../../hooks/useAuth";
import { NavLink } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";

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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const BASE_URL = "http://localhost:3500";

const mainPost = {
  title: "Sản phẩm dành cho thú cưng",
  description: "Cung cấp đầy đủ các loại sản phẩm hàng ngày dành cho thú cưng",
  image:
    "https://vuaphukienthucung.com/public/media/images/thiet-ke-hinh-anh-phu-kien-thu-cung-01.jpg",
  imageText: "Ảnh sản phẩm",
};

export default function ProductList() {
  const [data, setData] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [loged, setLoged] = useState(false);

  const context = useAuth();

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const CustomBox = styled(Box)({
    background: "linear-gradient(to right, #ADD8E6, #FFFF99, #FFC0CB)",
  });

  const CustomContainer = styled(Container)({
    background:
      "linear-gradient(to bottom, #F4BEB2, #F4BEB2, #ECDAD6, #E5E6E7, #73A1CC)",
  });

  // ----------------------------------- API GET ALL PRODUCT --------------------------------
  useEffect(() => {
    loadAllProduct(currentPage);
  }, [currentPage]);

  const loadAllProduct = async (page) => {
    try {
      const loadData = await axios.get(
        `${BASE_URL}/product?page=${page}&limit=9`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setTotalPages(loadData.data.pages);
        console.log("Check totalPage", totalPages);
        setData(loadData.data.docs);
        setTotalProducts(loadData.data.limit);
        console.log(loadData.data.docs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------- Click paging -----------------------------
  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };
  // ----------------------------------------------------------------

  // --------------------- GET DETAIL PRODUCT BY ID -----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const handleShowDetail = (productId) => {
    console.log("Check data", productId);
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <CustomContainer component="main" maxWidth="full" sx={{ mt: 8 }}>
        <MainPost post={mainPost} />
        <Container
          maxWidth="full"
          sx={{
            p: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
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
            <StyledBreadcrumb label="Sản phẩm" />
          </Breadcrumbs>
        </Container>

        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data &&
              data.map((value, index) => {
                return (
                  <Grid
                    hover
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    onClick={() => handleShowDetail(value)}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                        }}
                        image="https://source.unsplash.com/random?wallpapers"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {value.productName}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          {numberToVND(value.price)}
                        </Typography>
                        <Typography>SỐ LƯỢNG CÒN: {value.quantity}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>

          {/* Paging */}
          <Container
            maxWidth="full"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              m: 2,
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                onChange={handlePageClick}
                page={currentPage}
                color="primary"
              />
            </Stack>
          </Container>
        </Container>
      </CustomContainer>
      <ProductDetail
        open={isModalOpen}
        onClose={handleCloseEditModal}
        product={selectedProduct}
      />
      {/* End footer */}
      <Footer />
    </ThemeProvider>
  );
}
