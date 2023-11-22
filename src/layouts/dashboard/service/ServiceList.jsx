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
import TypographyCus from "../../../components/Typography/DescriptionCus";
import Footer from "../../../components/Footer/Footer";
import MainPost from "../../../components/MainPost.jsx/MainPost";
import ServiceDetail from "../../../components/Modal/ModalDetaiService";
import { NavLink } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Avatar, CardActionArea, IconButton, Tooltip } from "@mui/material";
import DropDownService from "../../../components/DropDown/DropDownService";
import ChoosePet from "../../../components/Modal/ModalChoosePet";
import useAuth from "../../../hooks/useAuth";

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
  title: "Dịch vụ chăm sóc thú cưng",
  description:
    "Tại PetCare, đội ngũ bác sĩ của chúng tôi được đào tạo để nâng cao năng lực chuyên môn và làm việc tại bệnh viện với cơ sở vật chất hiện đại nhằm duy trì tiêu chuẩn cao trong công tác chăm sóc sức khỏe vật nuôi",
  image: "https://toplist.vn/images/800px/-795198.jpg",
  imageText: "Ảnh",
};

export default function ServiceList() {
  const [data, setData] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
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

  // ----------------------------------- API GET ALL SERVICE --------------------------------
  useEffect(() => {
    loadAllService(currentPage);
  }, [currentPage]);

  const loadAllService = async (page) => {
    try {
      const loadData = await axios.get(
        `${BASE_URL}/service?page=${page}&limit=9`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        console.log("check data", loadData.data.docs);
        setTotalPages(loadData.data.pages);
        // console.log("Check totalPage", totalPages);
        setData(loadData.data.docs);
        setTotalServices(loadData.data.limit);
        // console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------- Click paging -----------------------------
  const handlePageClick = (event, value) => {
    setCurrentPage(value);
    // loadAllService(+event.selected + 1);
  };

  // --------------------- GET ALL CATEGORY SERVICE -----------------------------
  const [category, setCategory] = useState([]);
  async function loadAllCategoryService() {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/category/cateName/service`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setCategory(loadData.data.data);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCategoryService();
  }, []);

  // --------------------- GET ALL SERVICE BY CATEGORY ID SERVICE -----------------------------
  async function hanldeClickCategory(cateId) {
    console.log("Check data cate ID", cateId);
    if (cateId === null) {
      loadAllService();
    } else {
      try {
        const loadData = await axios.get(
          `http://localhost:3500/service?page=1&categoryId=${cateId}`
        );
        if (loadData.error) {
          toast.error(loadData.error);
        } else {
          console.log("Check loaddata", loadData.data);
          setTotalPages(loadData.data.pages);
          // console.log("Check totalPage", totalPages);
          setData(loadData.data.docs);
          setTotalServices(loadData.data.limit);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    hanldeClickCategory();
  }, []);

  // --------------------- GET DETAIL SERVICE BY ID -----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalChoosePetOpen, setIsModalChoosePetOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const handleShowDetail = (serviceId) => {
    console.log("Check data", serviceId);
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setIsModalChoosePetOpen(false);
    setSelectedService(null);
  };

  const handleAddToCartClick = () => {
    if (context.auth.token === undefined) {
      toast.warning("Bạn chưa đăng nhập, vui lòng đăng nhập !");
    } else {
      console.log("Check data", selectedService);
      setSelectedService(selectedService);
      setIsModalChoosePetOpen(true);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <CustomContainer component="main" maxWidth="full" sx={{ mt: 8 }}>
        <MainPost post={mainPost} />
        <Box
          maxWidth="full"
          sx={{
            bgcolor: "background.paper",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            borderRadius: "16px",
          }}
        >
          <Box>
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
                to="/service-homepage"
                label="Dịch vụ"
              />
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              justifyContent: "center",
            }}
          >
            <DropDownService
              category={category}
              cateName="Loại dịch vụ"
              handUpdateEditTable={hanldeClickCategory}
            />
          </Box>
        </Box>

        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data &&
              data.map((value, index) => {
                return (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <CardActionArea>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Tooltip
                          title="Xem chi tiết dịch vụ"
                          onClick={() => handleShowDetail(value)}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              // 16:9
                              pt: "56.25%",
                            }}
                            image="https://source.unsplash.com/random?wallpapers"
                          />
                        </Tooltip>

                        <CardContent hover sx={{ flexGrow: 1 }}>
                          <Tooltip
                            title="Xem chi tiết dịch vụ"
                            onClick={() => handleShowDetail(value)}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {value.serviceName}
                            </Typography>
                          </Tooltip>
                          <Box
                            display="flex"
                            flexGrow={1}
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Typography
                              gutterBottom
                              variant="h6"
                              component="h2"
                            >
                              {numberToVND(value.price)}
                            </Typography>
                            <Tooltip
                              title="Thêm vào giỏ dịch vụ"
                              onClick={handleAddToCartClick}
                              sx={{ backgroundColor: "pink" }}
                            >
                              <IconButton>
                                <AddShoppingCartIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <TypographyCus value={value} />
                        </CardContent>
                      </Card>
                    </CardActionArea>
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

      <ServiceDetail
        open={isModalOpen}
        onClose={handleCloseEditModal}
        service={selectedService}
      />
      {/* Choose pet */}
      <ChoosePet
        open={isModalChoosePetOpen}
        onClose={handleCloseEditModal}
        service={selectedService}
      />
      {/* End footer */}
      <Footer />
    </ThemeProvider>
  );
}
