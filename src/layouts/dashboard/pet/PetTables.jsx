import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Typography,
  Modal,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
  Radio,
  Pagination,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

import ButtonCustomize from "../../../components/Button/Button";

//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalAddPet from "../../../components/Modal/ModalAddPet";

// -------------------------------STYLE MODAL----------------------
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// -------------------------------API SERVER----------------------
const BASE_URL = "http://localhost:3500";

export default function PetTable() {
  const [data, setData] = useState([]);

  const [totalPets, setTotalPets] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // --------------------- MODAL HANDLE -----------------------------
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEditService, setDataEditService] = useState({});
  const [openComfirmModal, setOpenComfirmModal] = useState(false);
  const [dataDeteleService, setDataDeteleService] = useState({});

  // --------------------- OPEN MODAL  -----------------------------
  const handleCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleEditService = (service) => {
    console.log("Check data", service);
    setDataEditService(service);
    setOpenEditModal(true);
  };

  const handleDeleteService = (service) => {
    setOpenComfirmModal(true);
    setDataDeteleService(service);
    console.log(service);
  };
  // --------------------- CLOSE MODAL  -----------------------------
  const handleCloseModal = () => {
    setOpenCreateModal(false);
    setOpenEditModal(false);
    setOpenComfirmModal(false);
  };

  // --------------------- HANDLE UPDATE TABLE -----------------------------
  const handUpdateTable = (service) => {
    setData([service, ...data]);
  };

  // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
  const handleUpdate = (event) => {};

  // --------------------- HANDLE DELETE -----------------------------
  const handleDelete = async (id) => {};

  // --------------------- HANDLE CREATE PET -----------------------------
  // useEffect(() => {
  const handleCreateUser = async (event) => {};
  // })

  // ----------------------------------- API GET ALL PET --------------------------------
  useEffect(() => {
    loadAllPet(currentPage);
  }, [currentPage]);

  const loadAllPet = async (page) => {
    try {
      const loadData = await axios.get(`${BASE_URL}/pet?page=${page}`);
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setTotalPages(loadData.data.pages);
        console.log("Check totalPage", totalPages);
        setData(loadData.data.docs);
        setTotalPets(loadData.data.limit);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------- Click paging -----------------------------
  const handlePageClick = (event, value) => {
    setCurrentPage(value);
    // loadAllService(+event.selected + 1);
  };

  // ----------------------------------------------------------------

  return (
    <>
      <ButtonCustomize
        onClick={handleCreateModal}
        variant="contained"
        // component={RouterLink}
        nameButton="Thêm mới"
        width="15%"
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell children>ID</TableCell>
              <TableCell align="right">Chủ thú cưng</TableCell>
              <TableCell align="right">Tên thú cưng</TableCell>
              <TableCell align="right">Cấp thú cưng</TableCell>
              <TableCell align="right">Loại thú cưng</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((value, index) => {
                const statusColor = value.status ? "primary" : "error";
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index}
                    </TableCell>
                    <TableCell align="right">{value.userId}</TableCell>
                    <TableCell align="right">{value.petName}</TableCell>
                    <TableCell align="right">{value.rank}</TableCell>
                    <TableCell align="right">{value.category}</TableCell>
                    <TableCell align="right">
                      <Chip
                        size="small"
                        variant="outlined"
                        label={value.status ? "Hoạt động" : "Ẩn"}
                        color={statusColor}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ButtonCustomize
                        onClick={(e) => handleUpdate(value._id)}
                        variant="contained"
                        // component={RouterLink}
                        nameButton="Cập nhật"
                        fullWidth
                      />
                    </TableCell>
                    {/* <TableCell align="right">
                                        <ButtonCustomize
                                            onClick={(e) => handleDelete(value._id)}
                                            variant="contained"
                                            // component={RouterLink}
                                            nameButton="Xoá"
                                            fullWidth
                                        />
                                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Paging */}
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          onChange={handlePageClick}
          page={currentPage}
          color="primary"
        />
      </Stack>

      <ModalAddPet
        open={openCreateModal}
        onClose={handleCloseModal}
        handUpdateTable={handUpdateTable}
      />
    </>
  );
}
