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
import ModalAddProduct from "../../../components/Modal/ModalAddProduct";
import ModalEditProduct from "../../../components/Modal/ModalEditProduct";
import ModalComfirmProduct from "../../../components/Modal/ModalComfirmProduct";

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

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // --------------------- MODAL HANDLE -----------------------------
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEditProduct, setDataEditProduct] = useState({});
  const [openComfirmModal, setOpenComfirmModal] = useState(false);
  const [dataDeteleProduct, setDataDeteleProduct] = useState({});

  // --------------------- OPEN MODAL  -----------------------------
  const handleCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleUpdateProduct = (product) => {
    console.log("Check data", product);
    setDataEditProduct(product);
    setOpenEditModal(true);
  };

  const handleDeleteProduct = (product) => {
    setOpenComfirmModal(true);
    setDataDeteleProduct(product);
    console.log(product);
  };

  // --------------------- CLOSE MODAL  -----------------------------
  const handleCloseModal = () => {
    setOpenCreateModal(false);
    setOpenEditModal(false);
    setOpenComfirmModal(false);
  };

  // --------------------- HANDLE UPDATE TABLE -----------------------------
  const handUpdateTable = (product) => {
    setData([product, ...data]);
  };

  const handUpdateEditTable = (product) => {
    const newData = [...data];
    const productIndex = data.findIndex((value) => value._id === product.id);
    newData[productIndex] = product;
    setData(newData);
    // check data
    console.log(data, newData);
    console.log("check id", productIndex);
  };

  // --------------------- HANLDE PRODUCTS LIST UPDATE AFTER DELETE PRODUCT  -----------------------------
  const handUpdateDeleteTable = (product) => {
    console.log("Check data sevice:", product);
    const newData = [...data];
    const productIndex = newData.findIndex((value) => value._id === product);
    newData.splice(productIndex, 1);
    console.log("Check list delete", newData);
    setData(newData);
  };

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
        setTotalProducts(loadData.data.limit);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // --------------------- Click paging -----------------------------
  const handlePageClick = (event, value) => {
    setCurrentPage(value);
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
              <TableCell align="center">Tên sản phẩm</TableCell>
              <TableCell align="center">Số lượng</TableCell>
              <TableCell align="center">Giá tiền</TableCell>
              <TableCell align="center">Trạng thái</TableCell>
              <TableCell align="center">Chức năng</TableCell>
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
                    <TableCell align="left">{value.productName}</TableCell>
                    <TableCell align="left">{value.quantity}</TableCell>
                    <TableCell align="left">
                      {numberToVND(value.price)}
                    </TableCell>
                    <TableCell align="left">
                      {/* <Chip
                        size="small"
                        variant="outlined"
                        label={value.status ? "Hoạt động" : "Ẩn"}
                        color={statusColor}
                      /> */}
                    </TableCell>
                    <TableCell align="left">
                      <ButtonCustomize
                        onClick={() => handleUpdateProduct(value)}
                        variant="contained"
                        // component={RouterLink}
                        nameButton="Cập nhật"
                        fullWidth
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ButtonCustomize
                        onClick={() => handleDeleteProduct(value)}
                        variant="contained"
                        // component={RouterLink}
                        nameButton="Xoá"
                        fullWidth
                      />
                    </TableCell>
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
      {/* Modal create */}
      <ModalAddProduct
        open={openCreateModal}
        onClose={handleCloseModal}
        handUpdateTable={handUpdateTable}
      />
      {/* Modal update */}
      <ModalEditProduct
        open={openEditModal}
        onClose={handleCloseModal}
        dataEditProduct={dataEditProduct}
        handUpdateEditTable={handUpdateEditTable}
      />
      {/* Modal delete */}
      <ModalComfirmProduct
        open={openComfirmModal}
        onClose={handleCloseModal}
        dataDeteleProduct={dataDeteleProduct}
        handUpdateDeleteTable={handUpdateDeleteTable}
      />
    </>
  );
}