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
    ButtonGroup
} from "@mui/material";

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

export default function BasicTable() {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 5;

    const OPTION_VIEW_ORDER_BY_ID = 'view'

    const [option, setOption] = useState("");
    var count = 0;

    const [data, setData] = useState([]);
    const [role, setRole] = useState("");
    const [gender, setGender] = useState(true);
    const [fullname, setFullName] = useState("");
    const [password, setPassWord] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [id, setId] = useState("");
    const [orderDetail, setOrderDetail] = useState([]);

    // --------------------- MODAL HANDLE -----------------------------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUpdateTable = (value) => {
        setData([value, ...data]);
    };

    // --------------------- HANDLE ROLE -----------------------------
    const handleRoleChange = (event) => {
        setRole(event.target.value);
        console.log(role);
    };

    // --------------------- HANDLE GENDER -----------------------------
    const handleGenderChange = (event) => {
        setGender(event.target.value);
        console.log(gender);
    };

    // --------------------- HANDLE OPEN MODAL CREATE -----------------------------
    const handleCreate = (event) => {
        setOption("create");
        handleOpen();
    };

    // --------------------- HANDLE OPEN MODAL UPDATE -----------------------------
    const handleViewOrderDetail = async (id, option) => {
        try {
            console.log(id);
            const data = await axios.get(`http://localhost:3500/orderDetail/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log(data.data);
                setOrderDetail(data.data)
                // setId(data.data._id)
                // setFullName(data.data.fullname)
                // setEmail(data.data.email)
                // setPhone(data.data.phone)
                // setAddress(data.data.address)
                // setPassWord(password)
            }
        } catch (err) {
            console.log(err);
        }

        setOption(option);
        handleOpen();

        // console.log(event);
    };

    // --------------------- HANDLE UPDATE -----------------------------

    const handleUpdate = async () => {
        console.log(gender)
        try {
            const data = await axios.patch(`http://localhost:3500/user`, {
                fullname: fullname,
                password: password,
                email: email,
                address: address,
                phone: phone,
                gender: gender,
                role: role
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log(data);
                toast.success("Update successfully");
                handleClose()
                loadAllOrder(DEFAULT_PAGE, DEFAULT_LIMIT);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // --------------------- HANDLE DELETE -----------------------------
    const handleDelete = async (id) => {
        try {
            console.log(id);
            const data = await axios.delete(`http://localhost:3500/order/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log(data);
                toast.success("Delete successfully");
            }
        } catch (err) {
            console.log(err);
        }
    };

    // --------------------- HANDLE CREATE USER -----------------------------
    // useEffect(() => {
    const handleCreateUser = async (event) => {
        // e.preventDefault();
        // const { fullname, email, password } = data;
        try {
            const data = await axios.post("http://localhost:3500/register", {
                fullname,
                email,
                password,
                role,
                address,
                phone,
                gender,
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success("Register successful. Welcome!");
                handleUpdateTable({
                    fullname: fullname,
                    email: email,
                    phone: phone,
                    gender: gender,
                    address: address,
                });
                handleClose();
                loadAllOrder(DEFAULT_PAGE, DEFAULT_LIMIT);
            }
        } catch (err) {
            console.log(err);
        }
    };
    // })

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllOrder(page, limit) {
        try {
            const loadData = await axios.get(
                `http://localhost:3500/order?page=${page}&limit=${limit}`
            );
            if (loadData.error) {
                toast.error(loadData.error);
            } else {
                setData(loadData.data.docs);
                toast.success("Login successful");
                console.log(loadData.data.docs);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllOrder(DEFAULT_PAGE, DEFAULT_LIMIT);
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
            loadAllOrder(DEFAULT_PAGE, DEFAULT_LIMIT);
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

    // ----------------------------------------------------------------

    const errorStyle = {
        color: "red",
        // backgroundColor: "DodgerBlue",
        paddingLeft: "15px",
        fontSize: "12px"
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

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell children>ID</TableCell>
                            <TableCell align="right">Tên người dùng</TableCell>
                            <TableCell align="right">Ngày đặt hàng</TableCell>
                            <TableCell align="right">Tổng giá trị</TableCell>
                            <TableCell align="right">Trạng thái</TableCell>
                            <TableCell align="right">Chức năng</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data.map((value, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="right">{value.userId}</TableCell>
                                        <TableCell align="right">{value.createdAt}</TableCell>
                                        <TableCell align="right">{value.totalPrice}</TableCell>
                                        <TableCell align="right">
                                            {value.status}
                                        </TableCell>
                                        <TableCell align="right">
                                            <ButtonGroup variant="contained" fullWidth>
                                                <ButtonCustomize
                                                    onClick={(e) => handleViewOrderDetail(value._id, OPTION_VIEW_ORDER_BY_ID)}
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
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
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
                        {option === "view" ? "Chi tiết đơn hàng" : "Đang cập nhật ......"}
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

                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell children>STT</TableCell>
                                        <TableCell align="right">Mã đơn hàng</TableCell>
                                        <TableCell align="right">Mã sản phẩm</TableCell>
                                        <TableCell align="right">Số lượng</TableCell>
                                        <TableCell align="right">Giá</TableCell>
                                        <TableCell align="right">Chức năng</TableCell>
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
                                                    <TableCell align="right">{value.orderId}</TableCell>
                                                    <TableCell align="right">{value.productId}</TableCell>
                                                    <TableCell align="right">{value.quantity}</TableCell>
                                                    <TableCell align="right">default</TableCell>
                                                    <TableCell align="right">
                                                        {/* <ButtonGroup variant="contained" fullWidth>
                                                            <ButtonCustomize
                                                                onClick={(e) => handleViewOrderDetail(value._id, OPTION_VIEW_ORDER_BY_ID)}
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
                                                        </ButtonGroup> */}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        {option === "create" ? (
                            <Button
                                variant="contained"
                                margin="normal"
                                color="primary"
                                onClick={handleCreateUser}
                            >
                                Thêm nhân viên
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                margin="normal"
                                color="primary"
                                onClick={handleUpdate}
                            >
                                Cập nhật thông tin
                            </Button>
                        )}
                    </DialogActions>
                </Box>
            </Modal>
        </>
    );
}
