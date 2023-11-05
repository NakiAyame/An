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

  const ColorTypography = styled(Typography)(({ theme }) => ({
    // color: theme.palette.getContrastText("#ffff"),
    backgroundColor: "#3CB371",
    "&:hover": {
      backgroundColor: "#eb6434",
      color: "black",
    },
    display: "center",
    textTransform: "none",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  }));

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pb: 6,
          }}
        >
          <Container
            maxWidth="full"
            sx={{
              backgroundImage: `url('https://mcdn.coolmate.me/uploads/November2021/spa-thu-cung-la-gi-24.jpg')`,
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
                backgroundColor: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Dịch vụ chăm sóc thú cưng
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
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
        <Container sx={{ py: 8 }} maxWidth="lg">
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
        </Container>
      </main>
      {/* End footer */}
    </ThemeProvider>
  );
}
