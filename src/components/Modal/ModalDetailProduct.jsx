import { styled } from "@mui/material/styles";
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
  Avatar,
  Divider,
} from "@mui/material";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarIcon from "@mui/icons-material/Star";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Description } from "@mui/icons-material";
import TypographyCus from "../Typography/DescriptionCus";
import Comments from "../Comments/Comments";

const Image = styled("img")({
  maxWidth: "100%",
  maxHeight: 400,
});

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

  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  if (!product) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClose={onClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  const {
    productName,
    quantity,
    price,
    rating,
    description,
    productImage,
    _id,
  } = product;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Chi tiết sản phẩm
          </Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            color="inherit"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 2, padding: 12 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Image src={`${productImage}`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" sx={{ textTransform: "uppercase" }}>
              <strong>{productName}</strong>
            </Typography>
            <Typography variant="h5">
              <strong>{`${price} VNĐ`}</strong>
            </Typography>
            <Typography variant="body1">Số lượng còn:{quantity}</Typography>
            <Box>
              <Rating
                value={rating}
                precision={0.5}
                readOnly
                emptyIcon={<StarBorderIcon sx={{ fontSize: "1.5rem" }} />}
                halfIcon={<StarHalfIcon sx={{ fontSize: "1.5rem" }} />}
                icon={<StarIcon sx={{ fontSize: "1.5rem" }} />}
              />
            </Box>
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
      </Box>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Thông tin chi tiết sản phẩm
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{description}</AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Đánh giá sản phẩm
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Comments value={_id} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Dialog>
  );
};

export default ProductDetail;
