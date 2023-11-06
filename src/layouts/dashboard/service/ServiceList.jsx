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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const BASE_URL = "http://localhost:3500";

export default function ServiceList() {
  const [data, setData] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
    background: "linear-gradient(to right, #ADD8E6, #FFFF99, #FFC0CB)",
  });

  // ----------------------------------- API GET ALL SERVICE --------------------------------
  useEffect(() => {
    loadAllService(currentPage);
  }, [currentPage]);

  const loadAllService = async (page) => {
    try {
      const loadData = await axios.get(`${BASE_URL}/service?page=${page}`);
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
          `http://localhost:3500/service/find/${cateId}`
        );
        if (loadData.error) {
          toast.error(loadData.error);
        } else {
          console.log("Check loaddata", loadData.data);
          setTotalPages(loadData.data.pages);
          // console.log("Check totalPage", totalPages);
          setData(loadData.data);
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <Container
            maxWidth="full"
            sx={{
              backgroundImage: `url('https://toplist.vn/images/800px/-795198.jpg')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "500px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              sx={{
                textShadow: "2px 2px rgba(0, 0, 0, 0.5)",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              Dịch vụ chăm sóc thú cưng
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.primary"
              paragraph
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.4)",
              }}
            >
              Tại PetCare, đội ngũ bác sĩ của chúng tôi được đào tạo để nâng cao
              năng lực chuyên môn và làm việc tại bệnh viện với cơ sở vật chất
              hiện đại nhằm duy trì tiêu chuẩn cao trong công tác chăm sóc sức
              khỏe vật nuôi
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <ButtonCustomize
                Button
                size="small"
                variant="contained"
                // component={RouterLink}
                nameButton="Đăng kí dịch vụ"
                fullWidth
              />
              <ButtonCustomize
                Button
                size="small"
                variant="contained"
                // component={RouterLink}
                nameButton="Liên hệ dịch vụ chăm sóc"
                fullWidth
              />
            </Stack>
          </Container>
        </Box>

        <CustomBox
          sx={{
            bgcolor: "background.paper",
            pt: 1,
            pb: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ScrollableTabService
            category={category}
            handUpdateEditTable={hanldeClickCategory}
            handleLoadAllService = {loadAllService}
          />
        </CustomBox>
        <CustomContainer sx={{ py: 8 }} maxWidth="full">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data &&
              data.map((value, index) => {
                return (
                  <Grid item key={index} xs={12} sm={6} md={4}>
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
                          {value.serviceName}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h2">
                          {numberToVND(value.price)}
                        </Typography>
                        <Typography>{value.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <ButtonCustomize
                          Button
                          size="small"
                          variant="contained"
                          // component={RouterLink}
                          nameButton="Chi tiết"
                          fullWidth
                        />
                        <ButtonCustomize
                          Button
                          size="small"
                          variant="contained"
                          backgroundColor="Pink"
                          // component={RouterLink}
                          nameButton="Thêm vào giỏ hàng"
                          fullWidth
                        />
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
          {/* Paging */}
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              onChange={handlePageClick}
              page={currentPage}
              color="primary"
            />
          </Stack>
        </CustomContainer>
      </main>
      {/* End footer */}
    </ThemeProvider>
  );
}
