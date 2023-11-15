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

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const [option, setOption] = useState("");
    var count = 0;

    const [data, setData] = useState([]);
    const [role, setRole] = useState(" ");
    const [gender, setGender] = useState(true);
    const [fullname, setFullName] = useState(" ");
    const [password, setPassWord] = useState(" ");
    const [confirmPass, setConfirmPass] = useState(" ");
    const [email, setEmail] = useState(" ");
    const [phone, setPhone] = useState(" ");
    const [address, setAddress] = useState(" ");
    const [id, setId] = useState(" ");

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
    const handleLoadUserbId = async (id, password) => {
        try {
            console.log(id);
            const data = await axios.get(`http://localhost:3500/user/${id}`);
            if (data.error) {
                toast.error(data.error);
            } else {
                console.log(data.data);
                setId(data.data._id)
                setFullName(data.data.fullname)
                setEmail(data.data.email)
                setPhone(data.data.phone)
                setAddress(data.data.address)
                setPassWord(password)
            }
        } catch (err) {
            console.log(err);
        }

        setOption("update");
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
                loadAllUser(DEFAULT_PAGE, DEFAULT_LIMIT);
            }
        } catch (err) {
            console.log(err);
        }
    }

    // --------------------- HANDLE DELETE -----------------------------
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có muốn xoá không ?') == true) {
            try {
                console.log(id);
                const data = await axios.delete(`http://localhost:3500/user/${id}`);
                if (data.error) {
                    toast.error(data.error);
                } else {
                    console.log(data);
                    toast.success("Delete successfully");
                    loadAllUser()
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // --------------------- HANDLE CREATE USER -----------------------------
    // useEffect(() => {
    const handleCreateUser = async (event) => {
        if (fullname.trim() === "") {
            alert("Vui lòng điền tên người dùng")
        } else if (email.trim() === "") {
            alert("Vui lòng điền Email người dùng")
        } else if (!email.match(validRegex)) {
            alert("Email không chính xác")
        } else if (password.trim() === "") {
            alert("Vui lòng điền Mật khẩu người dùng")
        } else if (confirmPass.trim() === "") {
            alert("Vui lòng nhập lại mật khẩu người dùng")
        } else if (confirmPass.trim() !== password.trim()) {
            alert("Mật khẩu thứ 2 không đúng")
        }
        else {
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
                    console.log(data)
                    // handleClose();
                    loadAllUser(DEFAULT_PAGE, DEFAULT_LIMIT);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    // })

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllUser(page, limit) {
        try {
            const loadData = await axios.get(
                `http://localhost:3500/user`
            );
            if (loadData.error) {
                toast.error(loadData.error);
            } else {
                setData(loadData.data.docs);
                console.log(loadData.data.docs);
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        loadAllUser(DEFAULT_PAGE, DEFAULT_LIMIT);
    }, []);
    // ----------------------------------------------------------------

    const errorStyle = {
        color: "red",
        // backgroundColor: "DodgerBlue",
        paddingLeft: "15px",
        fontSize: "12px"
    };

    return (
        <>
            <ButtonCustomize
                onClick={handleCreate}
                variant="contained"
                // component={RouterLink}
                nameButton="Thêm mới"
                width="15%"
            />

            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell children>ID</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Gender</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Address</TableCell>
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
                                                {index}
                                            </TableCell>
                                            <TableCell align="right">{value.fullname}</TableCell>
                                            <TableCell align="right">{value.phone}</TableCell>
                                            <TableCell align="right">
                                                {(value.gender == true ? "Nam" : "Nữ")}
                                            </TableCell>
                                            <TableCell align="right">{value.email}</TableCell>
                                            <TableCell align="right">{value.address}</TableCell>
                                            <TableCell align="right">
                                                <ButtonGroup variant="contained" fullWidth>
                                                    <ButtonCustomize
                                                        onClick={(e) => handleLoadUserbId(value._id, value.password)}
                                                        variant="contained"
                                                        // component={RouterLink}
                                                        nameButton="Cập nhật"
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
            </Paper>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        {option === "create" ? "Thêm nhân viên" : "Cập nhật thông tin"}
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
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Họ và tên"
                                    margin="normal"
                                    value={fullname}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                                {fullname === "" ? <span style={errorStyle}>Vui lòng điền Họ và tên</span> : ""}
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Gmail"
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {email === "" ? <span style={errorStyle}>Vui lòng điền email</span> : ""}
                            </Grid>
                            {option === "create" ? (
                                <>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Mật khẩu"
                                            margin="normal"
                                            // value={serviceName}
                                            onChange={(e) => setPassWord(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Nhập lại mật khẩu"
                                            margin="normal"
                                            // value={serviceName}
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                        />
                                    </Grid>
                                </>
                            ) : (
                                ""
                            )}

                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    margin="normal"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                {/* {phone === "" ? <span style={errorStyle}>Vui lòng điền số điện thoại</span> : ""} */}
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    margin="normal"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Chức vụ</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select-required"
                                        value={role}
                                        label="Role"
                                        onChange={handleRoleChange}
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="customer">Customer</MenuItem>
                                        {/* <MenuItem value={30}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>
                                {role === "" ? <span style={errorStyle}>Vui lòng chọn role</span> : ""}
                            </Grid>
                            <Grid paddingLeft="50px" item xs={6}>
                                <RadioGroup
                                    value={gender}
                                    onChange={handleGenderChange}
                                    row
                                    aria-label="Giới tính"
                                    name="gender"
                                // label="Giới tính"
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio />}
                                        label="Nam"
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio />}
                                        label="Nữ"
                                    />
                                </RadioGroup>
                                {gender === "" ? <span style={errorStyle}>Vui lòng chọn giới tính</span> : ""}
                            </Grid>
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
