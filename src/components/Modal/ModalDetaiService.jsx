import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails, {
  accordionDetailsClasses,
} from "@mui/joy/AccordionDetails";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";

const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(20),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const Price = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.main,
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Image = styled("img")({
  maxWidth: "100%",
  maxHeight: 400,
});

const RatingWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: "8px",
});

const Reviews = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginLeft: theme.spacing(1),
}));

const ServiceDetail = ({ service }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseClick = () => {
    setQuantity((quantity) => quantity + 1);
  };

  const handleDecreaseClick = () => {
    setQuantity((quantity) => Math.max(quantity - 1, 1));
  };

  const handleAddToCartClick = () => {
    console.log(`Add ${quantity} '${service?.serviceName}' to cart`);
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  const { serviceName, description, price, rating, reviews } = service;

  return (
    <Root>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <img src={service.image} alt={serviceName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">{serviceName}</Typography>
          <Typography variant="subtitle1">{`${price} VNĐ`}</Typography>
          <Typography variant="body1">{description}</Typography>
          <Typography>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              emptyIcon={<StarBorderIcon />}
              halfIcon={<StarHalfIcon />}
              icon={<StarIcon />}
            />
            <Reviews variant="subtitle2">{`(${reviews} đánh giá)`}</Reviews>
          </Typography>
          <Typography variant="body1">Số lượng:</Typography>
          <Box display="flex" alignItems="center">
            <Button onClick={handleDecreaseClick} variant="outlined">
              -
            </Button>
            <Box mx={2}>{quantity}</Box>
            <Button onClick={handleIncreaseClick} variant="outlined">
              +
            </Button>
          </Box>
          <Button
            onClick={handleAddToCartClick}
            variant="contained"
            sx={{ marginTop: "8px" }}
          >
            Thêm vào giỏ hàng
          </Button>
        </Grid>
        <AccordionGroup
          variant="outlined"
          transition="0.2s"
          sx={{
            maxWidth: 400,
            borderRadius: "lg",
            [`& .${accordionSummaryClasses.button}:hover`]: {
              bgcolor: "transparent",
            },
            [`& .${accordionDetailsClasses.content}`]: {
              boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
              [`&.${accordionDetailsClasses.expanded}`]: {
                paddingBlock: "0.75rem",
              },
            },
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary>First accordion</AccordionSummary>
            <AccordionDetails variant="soft">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Second accordion</AccordionSummary>
            <AccordionDetails variant="soft">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Third accordion</AccordionSummary>
            <AccordionDetails variant="soft">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      </Grid>
    </Root>
  );
};

export default ServiceDetail;
