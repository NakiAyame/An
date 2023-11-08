import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ButtonGroup, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

//React
import { useState } from "react";
// Axios
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import ModalAddSerivce from "../../../components/Modal/ModalAddService";
import ModalEditSerivce from "../../../components/Modal/ModalEditService";
import ModalComfirmSerivce from "../../../components/Modal/ModalComfirmService";
import ButtonCustomize from "../../../components/Button/Button";
import DropDownService from "../../../components/DropDown/DropDownService";
import ServiceDetailModal from "./ServiceDetailModal";

const BASE_URL = "http://localhost:3500";

export default function ServiceTable() {
  const [data, setData] = useState([]);
  const [totalServices, setTotalServices] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // ----------------------------------- API GET ALL SERVICE --------------------------------
  useEffect(() => {
    loadAllService(currentPage);
  }, [currentPage]);

  const loadAllService = async (page) => {
    try {
      const loadData = await axios.get(`${BASE_URL}/service?page=${page}`);
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setTotalPages(loadData.data.pages);
        // console.log("Check totalPage", totalPages);
        setData(loadData.data.docs);
        setTotalServices(loadData.data.limit);
        // console.log(loadData.data);
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

  // --------------------- MODAL HANDLE -----------------------------
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataEditService, setDataEditService] = useState({});
  const [openComfirmModal, setOpenComfirmModal] = useState(false);
  const [dataDeteleService, setDataDeteleService] = useState({});
  const [openDetailModal, setOpenDetailModal] = useState(false);

  // --------------------- OPEN MODAL  -----------------------------
  const handleOpenModal = () => {
    setOpenModal(true);
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
    setOpenModal(false);
    setOpenEditModal(false);
    setOpenComfirmModal(false);
    setOpenDetailModal(false);
  };

  // --------------------- GET ALL CATEGORY SERVICE -----------------------------
  const [category, setCategory] = useState([]);
  async function loadAllCategoryService() {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/category/cateName/service`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setCategory(loadData.data.data);
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCategoryService();
  }, []);

  // --------------------- GET ALL SERVICE BY CATEGORY ID SERVICE -----------------------------
  async function hanldeClickCategory(cateId) {
    console.log("Check data cate ID", cateId);
    try {
      const loadData = await axios.get(
        `http://localhost:3500/service/find/${cateId}`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        console.log("Check loaddata", loadData.data);
        setTotalPages(loadData.data.pages);
        // console.log("Check totalPage", totalPages);
        setData(loadData.data);
        setTotalServices(loadData.data.limit);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    hanldeClickCategory();
  }, []);

  // --------------------- GET DETAIL SERVICE BY ID -----------------------------
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState({});
  const handleShowDetail = (serviceId) => {
    console.log("Check data", serviceId);
    setSelectedService(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
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
        <Grid item xs={6}>
          <ButtonCustomize
            onClick={handleOpenModal}
            variant="contained"
            // component={RouterLink}
            nameButton="Thêm mới"
            width="15%"
          />
        </Grid>

        <Grid item xs={6}>
          <DropDownService
            category={category}
            handUpdateEditTable={hanldeClickCategory}
          />
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
            {data &&
              data.map((value, index) => {
                const statusColor = value.status ? "primary" : "error";
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {(currentPage - 1) * 10 + index + 1}
                    </TableCell>
                    <TableCell align="right">{value.serviceName}</TableCell>
                    <TableCell align="right">
                      {category.map((valueCategory, Cid) => {
                        if (value.categoryId === valueCategory._id) {
                          return valueCategory.feature;
                        }
                      })}
                    </TableCell>
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
                        // onClick={() => handleUpdateServiceStatus(value._id)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <ButtonGroup variant="contained" fullWidth>
                        <ButtonCustomize
                          onClick={() => handleShowDetail(value)}
                          variant="contained"
                          // component={RouterLink}
                          nameButton="Chi tiết"
                          fullWidth
                        />
                        <ButtonCustomize
                          onClick={() => handleEditService(value)}
                          variant="contained"
                          // component={RouterLink}
                          nameButton="Cập nhật"
                          fullWidth
                        />
                        <ButtonCustomize
                          onClick={() => handleDeleteService(value)}
                          backgroundColor="red"
                          variant="contained"
                          // component={RouterLink}
                          nameButton="Xoá"
                          fullWidth
                        />
                      </ButtonGroup>
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

      <ModalAddSerivce
        open={openModal}
        onClose={handleCloseModal}
        handUpdateTable={loadAllService}
      />

      <ModalEditSerivce
        open={openEditModal}
        onClose={handleCloseModal}
        dataEditService={dataEditService}
        handUpdateEditTable={loadAllService}
      />

      <ModalComfirmSerivce
        open={openComfirmModal}
        onClose={handleCloseModal}
        dataDeteleService={dataDeteleService}
        handUpdateDeleteTable={loadAllService}
      />

      <ServiceDetailModal
        open={isModalOpen}
        onClose={handleCloseEditModal}
        serviceId={selectedService}
      />
    </>
  );
}
