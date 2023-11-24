import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useState, useEffect } from "react";
// Axios
import axios from "axios";
import { toast } from "react-toastify";

//@material-ui/core
import { NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CardActionArea,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const BASE_URL = "http://localhost:3500";
export default function ProductSlider() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // --------------------- HOVER -----------------------------
  const [isHoveredTitle, setIsHoveredTitle] = useState(null);

  const handleMouseOverTilte = (index) => {
    setIsHoveredTitle(index);
  };

  const handleMouseOutTilte = () => {
    setIsHoveredTitle(null);
  };

  // ----------------------------------- API GET ALL PRODUCT --------------------------------
  useEffect(() => {
    loadAllProduct();
  }, []);

  const loadAllProduct = async () => {
    try {
      const loadData = await axios.get(`${BASE_URL}/product`);
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setData(loadData.data.docs);
        console.log(loadData.data.docs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hanldeClickProductName = (id) => {
    console.log(id);
    navigate(`/product-homepage/${id}`);
  };

  return (
    <Grid container spacing={1}>
      {data &&
        data.map((value, index) => {
          return (
            <Grid item xs={12} sm={12}>
              <Typography variant="h6" component="h1">
                <Button
                  style={{
                    textDecoration: "none",
                    color: isHoveredTitle === index ? "pink" : "inherit",
                  }}
                  title={value.productName}
                  onMouseOver={() => handleMouseOverTilte(index)}
                  onMouseOut={handleMouseOutTilte}
                  onClick={() => hanldeClickProductName(value._id)}
                >
                  {value.productName}
                </Button>
              </Typography>
              <Divider />
            </Grid>
          );
        })}
    </Grid>
  );
}
