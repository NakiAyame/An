import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import { useState } from "react";

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
          <Image src={service.image} alt={serviceName} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Title variant="h5">{serviceName}</Title>
          <Price variant="subtitle1">{`${price} VNĐ`}</Price>
          <Description variant="body1">{description}</Description>
          <RatingWrapper>
            <Rating
              value={rating}
              precision={0.5}
              readOnly
              emptyIcon={<StarBorderIcon sx={{ fontSize: "1.5rem" }} />}
              halfIcon={<StarHalfIcon sx={{ fontSize: "1.5rem" }} />}
              icon={<StarIcon sx={{ fontSize: "1.5rem" }} />}
            />
            <Reviews variant="subtitle2">{`(${reviews} đánh giá)`}</Reviews>
          </RatingWrapper>
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
      </Grid>
    </Root>
  );
};

export default ServiceDetail;
