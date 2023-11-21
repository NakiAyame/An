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
    Pagination
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

import ButtonCustomize from "../../../components/Button/Button";
import DateFormat from "../../../components/DateFormat";

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

export default function BookingTable() {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;
    const [pages, setPages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const OPTION_VIEW_ORDER_BY_ID = 'view'

    const [option, setOption] = useState("");

    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [orderDetail, setOrderDetail] = useState([]);

    // --------------------- MODAL HANDLE -----------------------------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
    const handleViewOrderDetail = async (id, option) => {
        try {
            console.log(id);
            const data = await axios.get(`http://localhost:3500/bookingDetail/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log(data.data);
                setOrderDetail(data.data)
            }
        } catch (err) {
            console.log(err);
        }

        setOption(option);
        handleOpen();
    };

    // --------------------- HANDLE UPDATE -----------------------------



    // --------------------- HANDLE DELETE -----------------------------
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có muốn xoá Booking này không ?') == true) {
            try {
                console.log(id);
                const data = await axios.delete(`http://localhost:3500/booking/${id}`);
                if (data.error) {
                    toast.error(data.error);
                } else {
                    console.log(data);
                    toast.success("Xoá Booking thành công");
                    loadAllBooking()
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllBooking(page, limit) {
        try {
            const loadData = await axios.get(
                `http://localhost:3500/booking?page=${page}&limit=${limit}&sort=asc`
            )
                .then((data) => {
                    setData(data.data.docs);
                    setPages(data.data.pages);
                    console.log(data.data.docs);
                })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllBooking(DEFAULT_PAGE, DEFAULT_LIMIT);
    }, []);

    // ----------------------------------- HANDLE GET ORDER OF USER --------------------------------

    const [userId, setUserId] = useState('');

    const hanldeSearch = (e) => {
        setUserId(e.target.value)
    };

    const handleGetOrderByUserId = async () => {
        if (!userId == '') {
            getAllOrderByUserId();
        } else {
            loadAllBooking(DEFAULT_PAGE, DEFAULT_LIMIT);
        }

    }

    // ----------------------------------- GET ALL ORDER BY USER ID --------------------------------

    const getAllOrderByUserId = async () => {
        try {
            const loadData = await axios.get(
                `http://localhost:3500/order/${userId}`
            );
            if (loadData.error) {
                toast.error(loadData.error);
            } else {
                setData(loadData.data);
                // toast.success("Login successful");
                console.log(loadData.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // ---------------------------------------------------------------

    const handlePaging = (event, value) => {
        setCurrentPage(value === undefined ? 1 : value)
        loadAllBooking(value, DEFAULT_LIMIT);
    }

    // ----------------------------------------------------------------

    const errorStyle = {
        color: "red",
        // backgroundColor: "DodgerBlue",
        paddingLeft: "15px",
        fontSize: "12px"
    };

    const statusList = [
        'Chờ thanh toán', 'Thanh toán sau', 'Chờ xử lý dịch vụ', 'Hoàn thành', 'Huỷ'
    ]

    const hanldeClickChangeStatus = async (status, id) => {
        if (window.confirm('Bạn có muốn cập nhật trạng thái đơn hàng không ?') == true) {
            try {
                const loadData = await axios.put(
                    `http://localhost:3500/booking/update-status/${id}`, {
                    bookingStatus: status
                });
                if (loadData.error) {
                    toast.error(loadData.error);
                } else {
                    console.log(loadData.data);
                    loadAllBooking();
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

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
                    <TextField
                        // required
                        fullWidth
                        label="Tìm kiếm chủ thú cưng theo ID"
                        margin="normal"
                        size="small"
                        onChange={hanldeSearch}
                    />
                </Grid>
                <Grid item xs={6}>
                    <ButtonCustomize
                        onClick={handleGetOrderByUserId}
                        variant="contained"
                        // component={RouterLink}
                        nameButton="Tìm kiếm"
                    />
                </Grid>
            </Grid>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell children>ID</TableCell>
                                <TableCell align="left">Tên người dùng</TableCell>
                                <TableCell align="left">Ngày đặt dịch vụ</TableCell>
                                <TableCell align="left">Tổng giá trị</TableCell>
                                <TableCell align="left">Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data.map((value, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            onClick={(e) => handleViewOrderDetail(value._id, OPTION_VIEW_ORDER_BY_ID)}
                                        >
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="left">{value.userId !== null ? value.userId.fullname : ""}</TableCell>
                                            <TableCell align="left"><DateFormat date={value.createdAt} /></TableCell>
                                            <TableCell align="left">{value.totalPrice}</TableCell>
                                            <TableCell align="left">
                                                {value.status}
                                            </TableCell>
                                            {/* <TableCell align="left">
                                                <ButtonGroup variant="contained" fullWidth>
                                                    <ButtonCustomize
                                                        
                                                        variant="contained"
                                                        // component={RouterLink}
                                                        nameButton="xem chi tiết"
                                                        fullWidth
                                                    />
                                                    <ButtonCustomize
                                                        onClick={(e) => handleDelete(value._id)}
                                                        backgroundColor="red"
                                                        variant="contained"
                                                        // component={RouterLink}
                                                        nameButton="Xoá"
                                                        fullWidth
                                                    />
                                                </ButtonGroup>
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <hr style={{ opacity: '0.5' }} />
                <Stack spacing={2} sx={{ float: "right" }} style={{ margin: '10px 0', justifyContent: 'center' }}>
                    <Pagination
                        count={pages}
                        page={currentPage}
                        color="primary"
                        onChange={handlePaging}
                    />
                </Stack>
            </Paper>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {option === "view" ? "Chi tiết đơn hàng" : "Đang cập nhật ......"}
                    </DialogTitle>
                    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                        <InputLabel id="demo-select-small-label">Trạng thái</InputLabel>
                        <Select
                            label="Loại dịch vụ"
                        // value={selectedCategory}
                        // onChange={handleChangeCate}
                        >
                            {statusList.map((value, index) => {
                                return (
                                    <MenuItem
                                        key={index}
                                        value={'dsadsadsa'}
                                        onClick={(e) => hanldeClickChangeStatus(value, orderDetail[0].bookingId)}
                                    >
                                        {value}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
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

                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell children>STT</TableCell>
                                        <TableCell align="left">Tên thú cưng</TableCell>
                                        <TableCell align="left">Tên dịch vụ</TableCell>
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
                                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell align="left">{value.petId !== null ? value.petId.petName : ''}</TableCell>
                                                    <TableCell align="left">{value.serviceId !== null ? value.serviceId.serviceName : ''}</TableCell>
                                                    <TableCell align="left">{value.quantity}</TableCell>
                                                    <TableCell align="left">{value.serviceId !== null ? value.serviceId.price : ''}</TableCell>
                                                    <TableCell align="left"></TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            margin="normal"
                            color="primary"
                        // onClick={handleUpdate}
                        >
                            Cập nhật thông tin
                        </Button>
                    </DialogActions>
                </Box>
            </Modal>
        </>
    );
}
