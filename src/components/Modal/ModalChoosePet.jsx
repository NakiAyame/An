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
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
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
import AddIcon from "@mui/icons-material/Add";
import ModalAddPet from "./ModalAddPet";

const ChoosePet = ({ open, onClose, service }) => {
  // console.log(service);
  const [data, setData] = useState([]);
  const [dataCart, setDataCart] = useState([]);

  const [totalPets, setTotalPets] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const context = useAuth();

  // ----------------------------------- API GET ALL PET BY USER ID--------------------------------
  useEffect(() => {
    loadAllPetByUserId();
    handleLoadCartService();
  }, [context.auth.id]);

  const loadAllPetByUserId = async () => {
    try {
      const loadDataPet = await axios.get(
        `http://localhost:3500/pet/userid?id=${context.auth.id}`
      );
      if (loadDataPet.error) {
        toast.error(loadDataPet.error);
      } else {
        setTotalPages(loadDataPet.data.pages);
        console.log("Check totalPage", totalPages);
        // setData(loadDataPet.data.docs);
        const filterData = [];
        console.log(loadDataPet.data.docs);
        console.log(dataCart);

        for (let i = 0; i < loadDataPet.data.docs.length; i++) {
          for (let j = 0; j < dataCart.length; j++) {
            if (loadDataPet.data.docs[i]._id !== dataCart[j].petId._id) {
              filterData.push(loadDataPet.data.docs[i]);
              console.log("1");
            }
          }
        }
        setData(filterData);

        setData(loadDataPet.data.docs);

        setTotalPets(loadDataPet.data.limit);
        console.log("Kiểm tra pet của người dùng", loadDataPet.data.docs);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadCartService = async () => {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/cartService/view-cart`,
        {
          headers: { Authorization: context.auth.token },
          withCredentials: true,
        }
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setDataCart(loadData.data);
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
    if (
      window.confirm("Bạn có muốn cho thú cưng sử dụng dịch vụ này không ?") ==
      true
    ) {
      try {
        const addServiceToCart = await axios
          .post(
            `http://localhost:3500/cartService/add-to-cart`,
            {
              serviceId: service._id,
              petId: id,
            },
            {
              headers: { Authorization: context.auth.token },
              withCredentials: true,
            }
          )
          .then((data) => {
            alert("Thêm sản phẩm vào giỏ hàng thành công");
            onClose();
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chọn thú cưng</DialogTitle>
      <List sx={{ pt: 0 }}>
        {data &&
          data.map((value, index) => {
            return (
              <ListItem disableGutters>
                <ListItemButton onClick={() => handleAddToCart(value._id)}>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        value.petImage !== undefined
                          ? `${value.petImage}`
                          : "https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg"
                      }
                    ></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={value.petName} />
                </ListItemButton>
              </ListItem>
            );
          })}
        <ListItem disableGutters>
          <ListItemButton onClick={handleCreateModal}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Thêm thú cưng" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* Modal create */}
      <ModalAddPet
        open={openCreateModal}
        onClose={handleCloseModal}
        handUpdateTable={loadAllPetByUserId}
        page={currentPage}
        data={context.auth.id}
        category={category}
      />
    </Dialog>
  );
};

export default ChoosePet;
