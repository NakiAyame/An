import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  ButtonGroup,
  Grid,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";

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
import DropDownService from "../../../components/DropDown/DropDownService";

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
  const [currentPage, setCurrentPage] = useState(1);

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
    loadAllProduct(currentPage);
  }, [currentPage]);

  const loadAllProduct = async (page) => {
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

  // --------------------- GET ALL CATEGORY PRODUCT -----------------------------
  const [category, setCategory] = useState([]);
  async function loadAllCategoryProduct() {
    try {
      const loadDataCategoryProduct = await axios.get(
        `http://localhost:3500/category?categoryName=product`
      );
      if (loadDataCategoryProduct.error) {
        toast.error(loadDataCategoryProduct.error);
      } else {
        setCategory(loadDataCategoryProduct.data.docs);
        console.log(loadDataCategoryProduct.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCategoryProduct();
  }, []);

  // --------------------- GET ALL PRODUCT BY CATEGORY ID PRODUCT -----------------------------
  async function hanldeClickCategory(cateId) {
    console.log("Check data cate ID", cateId);
    if (cateId == undefined || cateId == "") {
      loadAllProduct(currentPage);
    } else {
      try {
        const loadData = await axios.get(
          `http://localhost:3500/product?page=1&categoryId=${cateId}`
        );
        if (loadData.error) {
          toast.error(loadData.error);
        } else {
          console.log("Check loaddata", loadData.data);
          setTotalPages(loadData.data.pages);
          // console.log("Check totalPage", totalPages);
          setData(loadData.data.docs);
          setTotalProducts(loadData.data.limit);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    hanldeClickCategory();
  }, []);

  // --------------------- Hanlde Search -----------------------------
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearchClick = async () => {
    if (keyword === "") {
      toast.warning("Hãy nhập kết quả bạn cần tìm");
      loadAllProduct(currentPage);
    } else {
      searchProductByName();
    }
  };

  // ----------------------------------- GET ALL PRODUCTS BY PRODUCT NAME --------------------------------
  const searchProductByName = async () => {
    try {
      const loadData = await axios.get(
        `${BASE_URL}/product?product=${keyword}&page=1`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setData(loadData.data.docs);
        setTotalProducts(loadData.data.limit);
        setTotalPages(loadData.data.pages);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid
        spacing={2}
        container
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Grid item>
          <TextField
            fullWidth
            label="Tìm kiếm"
            margin="normal"
            size="small"
            value={keyword}
            onChange={handleKeywordChange}
            // sx={{ position: "fixed" }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearchClick}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <DropDownService
            category={category}
            cateName="Loại sản phẩm"
            handUpdateEditTable={hanldeClickCategory}
          />
        </Grid>
        <Grid item>
          <ButtonCustomize
            onClick={handleCreateModal}
            color="white"
            // component={RouterLink}
            nameButton="Thêm mới"
          />
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell children>STT</TableCell>
                <TableCell align="center">Tên sản phẩm</TableCell>
                <TableCell align="center">Số lượng</TableCell>
                <TableCell align="center">Giá tiền</TableCell>
                <TableCell align="center">Thông tin sản phẩm</TableCell>
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
                        {(currentPage - 1) * 10 + (index + 1)}
                      </TableCell>
                      <TableCell align="left">{value.productName}</TableCell>
                      <TableCell align="center">{value.quantity}</TableCell>
                      <TableCell align="center">
                        {numberToVND(value.price)}
                      </TableCell>
                      <TableCell align="left">{value.description}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained">
                          <ButtonCustomize
                            onClick={() => handleUpdateProduct(value)}
                            // component={RouterLink}
                            nameButton="Cập nhật"
                          />
                          {/* <ButtonCustomize
                          onClick={() => handleDeleteProduct(value)}
                          backgroundColor="red"
                          // component={RouterLink}
                          nameButton="Xoá"
                        /> */}
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* Paging */}
      <Stack spacing={2} mt={2} sx={{ float: "right" }}>
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
        handUpdateTable={loadAllProduct}
        category={category}
        page={currentPage}
      />
      {/* Modal update */}
      <ModalEditProduct
        open={openEditModal}
        onClose={handleCloseModal}
        dataEditProduct={dataEditProduct}
        handUpdateEditTable={loadAllProduct}
        category={category}
        page={currentPage}
      />
      {/* Modal delete */}
      <ModalComfirmProduct
        open={openComfirmModal}
        onClose={handleCloseModal}
        dataDeteleProduct={dataDeteleProduct}
        handUpdateDeleteTable={loadAllProduct}
      />
    </>
  );
}
