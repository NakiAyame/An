import { styled } from "@mui/material/styles";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  Dialog,
  DialogTitle,
  IconButton,
  Toolbar,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Avatar, Container, Stack, TextField } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { Pagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ChoosePet = ({ open, onClose, service }) => {
  console.log(service)
  const [data, setData] = useState([]);

  const [totalPets, setTotalPets] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const context = useAuth();

  // ----------------------------------- API GET ALL PET BY USER ID--------------------------------
  useEffect(() => {
    loadAllPetByUserId();
  }, [context.auth.id]);

  const loadAllPetByUserId = async () => {
    try {
      const loadDataPet = await axios.get(
        `http://localhost:3500/pet/userid?id=${context.auth.id}&limit=3`
      );
      if (loadDataPet.error) {
        toast.error(loadDataPet.error);
      } else {
        setTotalPages(loadDataPet.data.pages);
        console.log("Check totalPage", totalPages);
        setData(loadDataPet.data.docs);
        setTotalPets(loadDataPet.data.limit);
        console.log("Kiểm tra pet của người dùng", loadDataPet.data.docs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------- Click paging -----------------------------
  const handlePageClick = (event, value) => {
    setCurrentPage(value);
  };

  // --------------------- MODAL HANDLE -----------------------------
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEditPet, setDataEditPet] = useState({});

  // --------------------- OPEN MODAL  -----------------------------
  const handleCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleUpdatePet = (pet) => {
    console.log("Check data", pet);
    setDataEditPet(pet);
    setOpenEditModal(true);
  };

  // --------------------- CLOSE MODAL  -----------------------------
  const handleCloseModal = () => {
    setOpenCreateModal(false);
    setOpenEditModal(false);
  };

  // --------------------- GET ALL CATEGORY PET -----------------------------
  const [category, setCategory] = useState([]);
  async function loadAllCategoryPet() {
    try {
      const loadDataCategoryPet = await axios.get(
        `http://localhost:3500/category?categoryName=animal`
      );
      if (loadDataCategoryPet.error) {
        toast.error(loadDataCategoryPet.error);
      } else {
        setCategory(loadDataCategoryPet.data.docs);
        console.log(loadDataCategoryPet.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCategoryPet();
  }, []);

  // --------------------------------ADD SERVICE TO CART------------------------------
  const handleAddToCart = async (id) => {
    if (window.confirm('Bạn có muốn cho thú cưng sử dụng dịch vụ này không ?') == true) {
      try {
        const addServiceToCart = await axios.post(
          `http://localhost:3500/cartService/add-to-cart`,
          {
            serviceId: service._id,
            petId: id
          },
          {
            headers: { 'Authorization': context.auth.token },
            withCredentials: true
          }
        )
          .then((data) => {
            alert('Thêm sản phẩm vào giỏ hàng thành công')
          })
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 1, flex: 1 }} variant="h6" component="div">
            Chọn thú cưng
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

      <Box sx={{ maxWidth: 700, flexGrow: 2, padding: 5 }}>
        <Container
          component="main"
          sx={{ maxWidth: 700, display: "flex", flexDirection: "row" }}
        >
          {data &&
            data.map((value, index) => {
              return (
                <Card sx={{ maxWidth: 700, ml: 2 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="100"
                      image="https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {value.petName}
                      </Typography>
                      <Typography level="h3" component="div">
                        Chủ nhân
                      </Typography>
                      <Typography level="h2" sx={{ maxWidth: "40ch" }}>
                        {value.userId.fullname}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleAddToCart(value._id)}>
                      Chọn
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
        </Container>
      </Box>
    </Dialog>
  );
};

export default ChoosePet;
