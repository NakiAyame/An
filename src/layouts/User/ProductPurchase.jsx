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
  ButtonGroup,
  Stack,
  Pagination,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import useAuth from "../../hooks/useAuth";
import DateFormat from "../../components/DateFormat";
import ButtonCustomize from "../../components/Button/Button";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function ProductPurchase() {
  const DEFAULT_PAGE = 1;
  const DEFAULT_LIMIT = 5;
  const DEFAULT_STATUS = "Chờ xác nhận";

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [loged, setLoged] = useState(false);
  const [total, setTotal] = useState(0);

  const [orderDetail, setOrderDetail] = useState([]);

  // --------------------- MODAL HANDLE -----------------------------

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const context = useAuth();

  const handleLoadCartProductById = async (option) => {
    if (context.auth.token !== undefined) {
      setLoged(true);
      try {
        const loadData = await axios
          .get(`http://localhost:3500/order/${context.auth.id}`, {
            headers: { Authorization: context.auth.token },
            withCredentials: true,
          })
          .then((data) => {
            const filterData = [];
            console.log(data.data.docs);

            for (let i = 0; i < data.data.docs.length; i++) {
              if (data.data.docs[i].status === option) {
                filterData.push(data.data.docs[i]);
              }
            }
            setData(filterData);
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    handleLoadCartProductById(DEFAULT_STATUS);
  }, []);

  // ----------------------------------------------------------------

  // ----------------------------------------------------------------

  const handleViewOrderDetail = async (id, option) => {
    try {
      console.log(id);
      const data = await axios.get(`http://localhost:3500/orderDetail/${id}`);
      if (data.error) {
        toast.error(data.error);
      } else {
        console.log(data.data);
        setOrderDetail(data.data);
      }
    } catch (err) {
      console.log(err);
    }
    handleOpen();
  };

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

  const buttonStyle = {
    width: "100%",
    padding: "16px 0",
    marginBottom: "20px",
    fontSize: "17px",
    border: "none",
    backgroundColor: "#efeff5",
    color: "black",
    cursor: "pointer",
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>
        SẢN PHẨM ĐÃ MUA
      </h1>
      <Grid container>
        <Grid item xs={4}>
          <button
            className="button-status"
            style={buttonStyle}
            onClick={(e) => handleLoadCartProductById("Chờ xác nhận")}
          >
            Chờ xác nhận
          </button>
        </Grid>
        <Grid item xs={4}>
          <button
            className="button-status"
            style={buttonStyle}
            onClick={(e) => handleLoadCartProductById("Đang giao hàng")}
          >
            Đang giao hàng
          </button>
        </Grid>
        <Grid item xs={4}>
          <button
            className="button-status"
            style={buttonStyle}
            onClick={(e) => handleLoadCartProductById("Đã nhận hàng")}
          >
            Đã nhận hàng
          </button>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="right">Người nhận hàng</TableCell>
              <TableCell align="right">Địa chỉ</TableCell>
              <TableCell align="right">Ngày đặt hàng</TableCell>
              <TableCell align="right">Tổng giá trị</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((value, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(e) => handleViewOrderDetail(value._id)}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{value.recipientName}</TableCell>
                <TableCell align="right">{value.deliveryAddress}</TableCell>
                <TableCell align="right">
                  <DateFormat date={value.updatedAt} />
                </TableCell>
                <TableCell align="right">{value.totalPrice}</TableCell>
                <TableCell align="right">{value.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Chi tiết đơn hàng
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Table sx={{ width: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell children>STT</TableCell>
                    <TableCell align="left">Mã đơn hàng</TableCell>
                    <TableCell align="left">Tên sản phẩm</TableCell>
                    <TableCell align="left">Số lượng</TableCell>
                    <TableCell align="left">Giá</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetail &&
                    orderDetail.map((value, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="left">{value.orderId}</TableCell>
                          <TableCell align="left">
                            {value.productId !== null
                              ? value.productId.productName
                              : ""}
                          </TableCell>
                          <TableCell align="left">{value.quantity}</TableCell>
                          <TableCell align="left">
                            {value.productId !== null
                              ? value.productId.price
                              : ""}
                          </TableCell>
                          <TableCell align="left"></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Grid>
          </DialogContent>
          {/* 
                    <DialogActions>
                        <Button
                            variant="contained"
                            margin="normal"
                            color="primary"
                        // onClick={handleUpdate}
                        >
                            Cập nhật thông tin
                        </Button>
                    </DialogActions> */}
        </Box>
      </Modal>
    </>
  );
}
