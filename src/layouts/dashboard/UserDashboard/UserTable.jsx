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
    Stack,
    Pagination
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import ButtonCustomize from "../../../components/Button/Button";

//React
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
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

const BasicTable = () => {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;
    const [pages, setPages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const PWD_REGEX = /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/;

    const [option, setOption] = useState("");
    const context = useAuth();

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
    const [status, setStatus] = useState(" ");

    // --------------------- MODAL HANDLE -----------------------------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                setStatus(data.data.status)
                setRole(data.data.role)
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
                role: role,
                status: status
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
    // const handleDelete = async (id) => {
    //     if (window.confirm(`Bạn có muốn xoá không ?`) == true) {
    //         try {
    //             console.log(id);
    //             const data = await axios.delete(`http://localhost:3500/user/${id}`);
    //             if (data.error) {
    //                 toast.error(data.error);
    //             } else {
    //                 console.log(data);
    //                 toast.success("Delete successfully");
    //                 loadAllUser(DEFAULT_PAGE, DEFAULT_LIMIT);
    //                 handleClose()
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }
    // };

    // --------------------- HANDLE CREATE USER -----------------------------
    // useEffect(() => {
    const handleCreateUser = async (event) => {
        if (fullname.trim() === "") {
            toast.error("Vui lòng điền tên người dùng")
        } else if (email.trim() === "") {
            toast.error("Vui lòng điền Email người dùng")
        } else if (!email.match(validRegex)) {
            toast.error("Email không chính xác")
        } else if (!password.match(PWD_REGEX)) {
            toast.error(
                "Mật khẩu bao gồm cả chữ hoa, chữ thường, số, ký tự đặc biệt và ít nhất 8 ký tự "
            );
        } else if (password.trim() === "") {
            toast.error("Vui lòng điền Mật khẩu người dùng")
        } else if (confirmPass.trim() !== password.trim()) {
            toast.error("Mật khẩu thứ 2 không đúng")
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
                    status: 'verifying'
                })
                    .then((data) => {
                        if (data.data.error === 'Email was taken') {
                            alert('Email đã được sử dụng')
                        } else {
                            toast.success("Register successful. Welcome!");
                            console.log(data)
                            handleClose();
                            loadAllUser(DEFAULT_PAGE, DEFAULT_LIMIT);
                        }
                    })
                    .catch((err) => {
                        alert(err)
                    })
            } catch (err) {
                console.log(err);
            }
        }
    };
    // })

    // ----------------------------------- API GET ALL USER --------------------------------
    async function loadAllUser(page, limit) {
        try {
            const row = [];
            const loadData = await axios.get(
                `http://localhost:3500/user?page=${page}&limit=${limit}`
            )
                .then((data) => {
                    setData(data.data.docs);
                    setPages(data.data.pages);
                    console.log(data.data);
                })
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

    // ----------------------------------------------------------------
    const handlePaging = (event, value) => {
        setCurrentPage(value === undefined ? 1 : value)
        loadAllUser(value, DEFAULT_LIMIT);
    }

    return (
        context.auth.role === 'staff'
            ?
            <>
                <h1>BẠN KHÔNG CÓ QUYỀN SỬ DỤNG CHỨC NĂNG NÀY</h1>
            </>
            :
            <>
                <ButtonCustomize
                    onClick={handleCreate}
                    variant="contained"
                    // component={RouterLink}
                    nameButton="Thêm mới"
                    width="15%"
                />

                <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "20px" }}>
                    <TableContainer sx={{ maxHeight: 550 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell children>STT</TableCell>
                                    <TableCell align="right">Họ và tên</TableCell>
                                    <TableCell align="right">Số điện thoại</TableCell>
                                    <TableCell align="right">Loại tài khoản</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">Trạng thái</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data &&
                                    data.map((value, index) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                onClick={(e) => handleLoadUserbId(value._id, value.password)}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="right">{value.fullname}</TableCell>
                                                <TableCell align="right">{value.phone}</TableCell>
                                                <TableCell align="right">
                                                    {(value.role === 'admin' ? "Quản lý"
                                                        : value.role === 'staff' ? 'Nhân viên'
                                                            : 'Khách hàng'
                                                    )}
                                                </TableCell>
                                                <TableCell align="right">{value.email}</TableCell>
                                                <TableCell align="right">{value.status}</TableCell>
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
                            onChange={handlePaging}
                            color="primary"
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
                                    {
                                        option === 'create'
                                            ? (<TextField
                                                required
                                                fullWidth
                                                label="Gmail"
                                                margin="normal"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />)
                                            :
                                            (<TextField
                                                required
                                                fullWidth
                                                label="Gmail"
                                                margin="normal"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                disabled
                                            />)
                                    }
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
                                            <MenuItem value="admin">Quản lý</MenuItem>
                                            <MenuItem value="staff">Nhân viên</MenuItem>
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
                                <div>
                                    <Button
                                        variant="contained"
                                        margin="normal"
                                        color="primary"
                                        onClick={handleUpdate}
                                    >
                                        Cập nhật thông tin
                                    </Button>
                                    {/* <Button
                                        variant="contained"
                                        margin="normal"
                                        style={{ backgroundColor: 'red', marginLeft: '20px' }}
                                        onClick={(e) => handleDelete(id)}
                                    >
                                        Xoá
                                    </Button> */}
                                </div>

                            )}
                        </DialogActions>
                    </Box>
                </Modal>
            </>
    );
}

export default BasicTable;
