import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { Avatar, Container, Stack, TextField } from "@mui/joy";
import PetsIcon from "@mui/icons-material/Pets";
import { Breadcrumbs, Pagination } from "@mui/material";
import ModalAddPet from "../../components/Modal/ModalAddPet";
import ModalEditPet from "../../components/Modal/ModalEditPet";
import { NavLink } from "react-router-dom";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { emphasize, styled } from "@mui/material/styles";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function PetUser() {
  const [data, setData] = useState([]);

  const [totalPets, setTotalPets] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const context = useAuth();
  console.log(context);

  // ----------------------------------- API GET ALL PET BY USER ID--------------------------------
  useEffect(() => {
    loadAllPetByUserId(currentPage);
  }, [currentPage]);

  const loadAllPetByUserId = async (page) => {
    console.log("Kiểm tra page", page);
    try {
      const loadDataPet = await axios.get(
        `http://localhost:3500/pet/userid?id=${context.auth.id}&limit=3&page=${page}`
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

  return (
    <React.Fragment>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ mt: 4, display: "flex", flexDirection: "row" }}
      >
        <Breadcrumbs maxItems={2} aria-label="breadcrumb">
          <StyledBreadcrumb
            component={NavLink}
            to="/"
            label="Trang chủ"
            icon={<HomeIcon fontSize="small" />}
          />
          {/* <StyledBreadcrumb component="a" href="#" label="Catalog" /> */}
          <StyledBreadcrumb label="Thông tin thú cưng" />
        </Breadcrumbs>
      </Container>

      <Container
        component="main"
        maxWidth="lg"
        sx={{ mt: 4, display: "flex", flexDirection: "row" }}
      >
        {data &&
          data.map((value, index) => {
            return (
              <Card
                onClick={() => handleUpdatePet(value)}
                data-resizable
                sx={{
                  mr: 3,
                  textAlign: "center",
                  alignItems: "center",
                  width: 343,
                  // to make the demo resizable
                  overflow: "auto",
                  resize: "horizontal",
                  "--icon-size": "100px",
                }}
              >
                <CardOverflow
                  variant="solid"
                  color="warning"
                  sx={{
                    resize: "vertical",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <AspectRatio
                    variant="outlined"
                    color="warning"
                    ratio="1"
                    sx={{
                      m: "auto",
                      transform: "translateY(50%)",
                      borderRadius: "50%",
                      width: "var(--icon-size)",
                      boxShadow: "sm",
                      bgcolor: "background.surface",
                      position: "relative",
                    }}
                  >
                    <Avatar src="https://static2-images.vnncdn.net/files/publish/2022/12/8/meo-1-1416.jpg" />
                  </AspectRatio>

                  <AspectRatio
                    variant="outlined"
                    color="warning"
                    ratio="1"
                    sx={{
                      m: "auto",
                      transform: "translateY(90%)",
                      borderRadius: "50%",
                      width: "var(--icon-size)",
                      boxShadow: "sm",
                      bgcolor: "background.surface",
                      position: "relative",
                      width: "20%",
                    }}
                  >
                    <Typography level="h2" component="div">
                      LV{value.rank}
                    </Typography>
                  </AspectRatio>
                </CardOverflow>
                <Typography
                  level="title-lg"
                  sx={{ mt: "calc(var(--icon-size) / 2)" }}
                >
                  🎊 {value.petName} 🎊
                </Typography>
                <Typography level="h3" component="div">
                  Chủ nhân
                </Typography>
                <Typography level="h2" sx={{ maxWidth: "40ch" }}>
                  {value.userId.fullname}
                </Typography>
                <CardActions
                  orientation="vertical"
                  buttonFlex={1}
                  sx={{
                    "--Button-radius": "40px",
                    width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
                  }}
                >
                  <Button variant="solid" color="warning">
                    Sửa thông tin
                  </Button>
                </CardActions>
              </Card>
            );
          })}
        <Card
          data-resizable
          sx={{
            textAlign: "center",
            alignItems: "center",
            width: 343,
            // to make the demo resizable
            overflow: "auto",
            resize: "horizontal",
            "--icon-size": "100px",
          }}
        >
          <CardOverflow
            variant="solid"
            color="warning"
            sx={{
              resize: "vertical",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <AspectRatio
              variant="outlined"
              color="warning"
              ratio="1"
              sx={{
                m: "auto",
                transform: "translateY(50%)",
                borderRadius: "50%",
                width: "var(--icon-size)",
                boxShadow: "sm",
                bgcolor: "background.surface",
                position: "relative",
              }}
            >
              <PetsIcon />
            </AspectRatio>
          </CardOverflow>
          <Typography
            level="title-lg"
            sx={{ mt: "calc(var(--icon-size) / 2)" }}
          >
            Thêm thú cưng
          </Typography>

          <CardActions
            orientation="vertical"
            buttonFlex={1}
            sx={{
              "--Button-radius": "40px",
              width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
            }}
          >
            <Button variant="solid" color="warning" onClick={handleCreateModal}>
              Thêm
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Container
        maxWidth="full"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 2,
        }}
      >
        {/* Paging */}
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            onChange={handlePageClick}
            page={currentPage}
            color="warning"
          />
        </Stack>
      </Container>
      {/* Modal create */}
      <ModalAddPet
        open={openCreateModal}
        onClose={handleCloseModal}
        handUpdateTable={loadAllPetByUserId}
        page={currentPage}
        data={context.auth.id}
        category={category}
      />
      {/* Modal update */}
      <ModalEditPet
        open={openEditModal}
        onClose={handleCloseModal}
        dataEditPet={dataEditPet}
        handUpdateEditTable={loadAllPetByUserId}
        page={currentPage}
        category={category}
      />
    </React.Fragment>
  );
}
