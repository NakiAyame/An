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
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Home() {
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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AutoPlaySwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {images.map((step, index) => (
            <div key={step.label}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    height: 600,
                    display: "block",
                    overflow: "hidden",
                    width: "100%",
                  }}
                  src={step.imgPath}
                  alt={step.label}
                />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>

      <div className="container">
        <div className="image-container">
          <img
            src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
            alt="Image"
          />
        </div>
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            natus. Sequi earum error ut, veritatis nisi aspernatur voluptatem
            explicabo vel natus modi magni dolorum at voluptas dolorem cum
            officia praesentium.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            natus. Sequi earum error ut, veritatis nisi aspernatur voluptatem
            explicabo vel natus modi magni dolorum at voluptas dolorem cum
            officia praesentium.
          </p>
        </div>
        <div className="image-container">
          <img
            src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
            alt="Image"
          />
        </div>
      </div>
      <div className="container">
        <div className="image-container">
          <img
            src="https://media.macphun.com/img/uploads/customer/how-to/608/15542038745ca344e267fb80.28757312.jpg?q=85&w=1340"
            alt="Image"
          />
        </div>
        <div className="text-container">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur,
            natus. Sequi earum error ut, veritatis nisi aspernatur voluptatem
            explicabo vel natus modi magni dolorum at voluptas dolorem cum
            officia praesentium.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
