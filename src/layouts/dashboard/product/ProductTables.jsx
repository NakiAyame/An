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
} from "@mui/material";
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

export default function ProductTable() {
  const [data, setData] = useState([]);

  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // --------------------- MODAL HANDLE -----------------------------

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdateTable = (value) => {
    setData([value, ...data]);
  };

  // --------------------- HANDLE OPEN MODAL CREATE -----------------------------
  const handleCreate = (event) => {};

  // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
  const handleUpdate = (event) => {};

  // --------------------- HANDLE DELETE -----------------------------
  const handleDelete = async (id) => {};

  // --------------------- HANDLE CREATE PET -----------------------------
  // useEffect(() => {
  const handleCreateUser = async (event) => {};
  // })

  // ----------------------------------- API GET ALL PRODUCT --------------------------------
  useEffect(() => {
    loadAllPet(currentPage);
  }, [currentPage]);

  const loadAllPet = async (page) => {
    try {
      const loadData = await axios.get(`${BASE_URL}/product?page=${page}`);
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setTotalPages(loadData.data.pages);
        console.log("Check totalPage", totalPages);
        setData(loadData.data.docs);
        setTotalServices(loadData.data.limit);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // ----------------------------------------------------------------

  return (
    <>
      <ButtonCustomize
        onClick={handleCreate}
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
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá tiền</TableCell>
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
                    <TableCell align="right">{value.productName}</TableCell>
                    <TableCell align="right">{value.quantity}</TableCell>
                    <TableCell align="right">
                      {numberToVND(value.price)}
                    </TableCell>
                    <TableCell align="right">
                      {/* <Chip
                        size="small"
                        variant="outlined"
                        label={value.status ? "Hoạt động" : "Ẩn"}
                        color={statusColor}
                      /> */}
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
    </>
  );
}
