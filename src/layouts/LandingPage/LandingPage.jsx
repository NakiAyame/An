import Header from "../../components/Header/Header";
import CarouselComponent from "../../components/Carousel/Carousel";
import "./LandingPage.css";
import Footer from "../../components/Footer/Footer";
import { Outlet } from "react-router-dom";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
// import { Container, Grid, styled } from "@mui/material";
// import FeaturedPost from "../../components/MainPost/FeaturePost";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Home() {
  // const CustomBox = styled(Box)({
  //   background: "linear-gradient(to right, #ADF9F0, #FADAF7, #EEDCF1, #EBEAEB)",
  // });

  // const CustomContainer = styled(Container)({
  //   background:
  //     "linear-gradient(to bottom, #F4BEB2, #F4BEB2, #ECDAD6, #E5E6E7, #73A1CC)",
  // });

  const images = [
    {
      imgPath:
        "https://www.eluniversal.com.co/binrepository/1200x679/0c0/0d0/none/13704/PIEV/mascotas_6978543_20221111132305.jpg",
    },
    {
      imgPath:
        "https://w.forfun.com/fetch/fc/fc13571b3a332105b55ca9d43fe9400d.jpeg",
    },
    {
      imgPath:
        "https://kenhz.net/wp-content/uploads/2022/06/pet-shop-quan-7.jpg",
    },
    {
      imgPath:
        "https://cdn-bcldb.nitrocdn.com/kLRdXZGeQymYELvyTfXVsQALHhzNRamH/assets/images/optimized/rev-8a40e72/www.teamais.net/wp-content/uploads/2020/08/vet-min.jpg",
    },
  ];

  const post1 = {
    title: "Chăm sóc - Làm đẹp",
    description: "Tắm gội, cắt tỉa lông móng, ",
    description2: "vệ sinh răng miệng",
    description3: "vệ sinh tai mũi, massage,...",
    image:
      "https://www.adventuresofyoo.com/wp-content/uploads/2016/07/4-Herman-After.jpg",
    imageLabel: "Image Text",
  };

  const post2 = {
    title: "Ký gửi thú cưng",
    description:
      "Homestay cho thú cưng - các chuồng với đa dạng kiểu dáng, được trang bị ",
    description2: "đầy đủ các tính năng cùng với ",
    description3: "chế độ chăm sóc đạt chuẩn.",
    image:
      "https://vethospital.vnua.edu.vn/wp-content/uploads/2019/12/61c4036d5df6a4a8fde7-1024x768.jpg",
    imageLabel: "Image Text",
  };

  const post3 = {
    title: "Khám - Chữa bệnh",
    description: "Cung cấp nhiều dịch vụ khám chữa bệnh",
    description2: "với trang thiết bị y tế hiện đại,",
    description3: "đội ngũ nhân viên y tế tận tình.",
    image:
      "https://dreampet.com.vn/wp-content/uploads/2021/02/phong-kham-thu-y.jpg",
    imageLabel: "Image Text",
  };

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <></>
    // <CustomContainer component="main" maxWidth={false} disableGutters>
    //   <Box sx={{ flexGrow: 1 }}>
    //     <AutoPlaySwipeableViews
    //       axis={theme.direction === "rtl" ? "x-reverse" : "x"}
    //       index={activeStep}
    //       onChangeIndex={handleStepChange}
    //       enableMouseEvents
    //     >
    //       {images.map((step, index) => (
    //         <div key={step.label}>
    //           {Math.abs(activeStep - index) <= 2 ? (
    //             <Box
    //               component="img"
    //               sx={{
    //                 height: 600,
    //                 display: "block",
    //                 overflow: "hidden",
    //                 width: "100%",
    //               }}
    //               src={step.imgPath}
    //               alt={step.label}
    //             />
    //           ) : null}
    //         </div>
    //       ))}
    //     </AutoPlaySwipeableViews>
    //     <MobileStepper
    //       steps={maxSteps}
    //       position="static"
    //       activeStep={activeStep}
    //       nextButton={
    //         <Button
    //           size="small"
    //           onClick={handleNext}
    //           disabled={activeStep === maxSteps - 1}
    //         >
    //           Next
    //           {theme.direction === "rtl" ? (
    //             <KeyboardArrowLeft />
    //           ) : (
    //             <KeyboardArrowRight />
    //           )}
    //         </Button>
    //       }
    //       backButton={
    //         <Button
    //           size="small"
    //           onClick={handleBack}
    //           disabled={activeStep === 0}
    //         >
    //           {theme.direction === "rtl" ? (
    //             <KeyboardArrowRight />
    //           ) : (
    //             <KeyboardArrowLeft />
    //           )}
    //           Back
    //         </Button>
    //       }
    //     />
    //   </Box>

    //   <CustomBox
    //     sx={{
    //       p: 3,
    //       justifyContent: "center",
    //       textAlign: "center",
    //       borderRadius: "16px",
    //       fontSize: "30px",
    //     }}
    //   >
    //     <strong>
    //       PetCare - Điểm đến uy tín hàng đầu chuyên cung cấp dịch vụ chăm sóc
    //       thú cưng.
    //     </strong>
    //   </CustomBox>

    //   <Grid container spacing={4} sx={{ m: 1, justifyContent: "center" }}>
    //     <FeaturedPost post1={post1} post2={post2} post3={post3} />
    //   </Grid>

    //   <Footer />
    // </CustomContainer>
  );
}

export default Home;