import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

import ReactPaginate from "react-paginate";
import Stack from "@mui/material/Stack";

//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalAddSerivce from "../../../components/Modal/ModalAddService";
import ModalEditSerivce from "../../../components/Modal/ModalEditService";

const BASE_URL = "http://localhost:3500"; // địa chỉ của server API

export default function ServiceTable() {
  const [data, setData] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    loadAllService(1);
  }, []);

  const loadAllService = async (page) => {
    try {
      const loadData = await axios.get(`${BASE_URL}/service?page=${page}`);
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setTotalPages(loadData.data.pages);
        console.log("Check totalPage", totalPages);
        setData(loadData.data.docs);
        setTotalServices(loadData.data.total);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = (event) => {
    console.log("event lib: ", event);
    loadAllService(+event.selected + 1);
  };

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEditService, setDataEditService] = useState({});

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenEditModal(false);
  };

  const handUpdateTable = (service) => {
    setData([service, ...data]);
  };

  // Update table sau khi sửa xong
  const handUpdateEditTable = (service) => {
    const newData = [...data];
    const serviceIndex = data.findIndex((value) => value._id === service.id);
    newData[serviceIndex] = service;
    setData(newData);
    // check data
    console.log(data, newData);
    console.log("check id", serviceIndex);
  };

  const handleEditService = (service) => {
    console.log("Check data", service);
    setDataEditService(service);
    setOpenEditModal(true);
  };

  const handleUpdateServiceStatus = async (serviceId) => {
    console.log(serviceId);
    try {
      // Kiểm tra xem đối tượng 'value' có tồn tại không
      const serviceToUpdate = data.find((service) => service._id === serviceId);
      if (!serviceToUpdate) {
        console.log("Service not found");
        return;
      }

      // Cập nhật trạng thái mới
      const newStatus = !serviceToUpdate.status;
      const updatedService = { ...serviceToUpdate, status: newStatus };

      // Cập nhật dữ liệu
      const newData = [...data];
      const serviceIndex = newData.findIndex(
        (service) => service._id === serviceId
      );
      newData[serviceIndex] = updatedService;
      setData(newData);

      // Gọi API để cập nhật trạng thái của dịch vụ
      await axios.patch(`http://localhost:3500/service/${serviceId}`, {
        status: newStatus,
      });

      // Cập nhật trạng thái mới
      const response = await axios.get(
        `http://localhost:3500/service/${serviceId}`
      );
      const updatedData = newData.map((service) =>
        service.id === response.data.id ? response.data : service
      );
      setData(updatedData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center" mb={3}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Thêm mới
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell align="right">Tên dịch vụ</TableCell>
              <TableCell align="right">Loại dịch vụ</TableCell>
              <TableCell align="right">Thông tin</TableCell>
              <TableCell align="right">Giá dịch vụ</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
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
                    <TableCell align="right">{value.serviceName}</TableCell>
                    <TableCell align="right">{value.categoryId}</TableCell>
                    <TableCell align="right">{value.description}</TableCell>
                    <TableCell align="right">
                      {numberToVND(value.price)}
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        size="small"
                        variant="outlined"
                        label={value.status ? "Hoạt động" : "Ẩn"}
                        color={statusColor}
                        onClick={() => handleUpdateServiceStatus(value._id)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="contained" fullWidth>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleEditService(value)}
                        >
                          Sửa
                        </Button>
                        <Button variant="contained" color="error">
                          Xoá
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Paging */}
      <Pagination
        count={totalPages}
        onClick={handlePageClick}
        color="primary"
      />

      <ModalAddSerivce
        open={openModal}
        onClose={handleCloseModal}
        handUpdateTable={handUpdateTable}
      />

      <ModalEditSerivce
        open={openEditModal}
        onClose={handleCloseModal}
        dataEditService={dataEditService}
        handUpdateEditTable={handUpdateEditTable}
      />
    </>
  );
}
