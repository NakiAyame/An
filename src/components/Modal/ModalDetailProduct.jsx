import { styled } from "@mui/material/styles";
import { Box, Grid, Typography, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Root = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
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

const ProductDetail = ({ open, onClose, product }) => {
  const [quantitySell, setQuantitySell] = useState(1);

  const handleIncreaseClick = () => {
    setQuantitySell((quantitySell) => quantitySell + 1);
  };

  const handleDecreaseClick = () => {
    setQuantitySell((quantitySell) => Math.max(quantitySell - 1, 1));
  };

  const handleAddToCartClick = () => {
    console.log(`Add ${quantitySell} '${product?.productName}' to cart`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { productName, quantity, price, rating, reviews } = product;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Root>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Image src={product.image} alt={productName} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Title variant="h5">{productName}</Title>
            <Price variant="subtitle1">{`${price} VNĐ`}</Price>
            <Description variant="body1">Số lượng còn:{quantity}</Description>
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
              <Box mx={2}>{quantitySell}</Box>
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
    </Dialog>
  );
};

export default ProductDetail;
