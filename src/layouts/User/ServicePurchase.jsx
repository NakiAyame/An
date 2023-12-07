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
import { NavLink, useNavigate } from "react-router-dom";

const bull = (
    <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
        •
    </Box>
);

export default function ServicePurchase() {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 5;
    const DEFAULT_STATUS = "Chờ thanh toán";

    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [loged, setLoged] = useState(false)
    const [total, setTotal] = useState(0)
    const [pages, setPages] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [status, setStatus] = useState('');

    const [orderDetail, setOrderDetail] = useState([]);

    // --------------------- MODAL HANDLE -----------------------------

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const context = useAuth();
    const navigate = useNavigate();

    const handleLoadCartServiceById = async (option) => {
        if (context.auth.token !== undefined) {
            setLoged(true)
            try {
                setStatus(option)
                const loadData = await axios.get(
                    `http://localhost:3500/booking/${context.auth.id}`,
                    {
                        headers: { 'Authorization': context.auth.token },
                        withCredentials: true
                    }
                )
                    .then((data) => {
                        const filterData = []
                        console.log(data.data)

                        for (let i = 0; i < data.data.docs.length; i++) {
                            if (data.data.docs[i].status === option) {
                                filterData.push(data.data.docs[i])
                            }
                        }
                        setData(filterData)
                    })
            } catch (err) {
                console.log(err);
            }
            setData(filterData);
        }
    }

}


useEffect(() => {
    handleLoadCartServiceById(DEFAULT_STATUS);
}, []);

// ----------------------------------------------------------------

const handlePaging = (event, value) => {
    setCurrentPage(value === undefined ? 1 : value);
    handleLoadCartServiceById(DEFAULT_STATUS);
};

// ----------------------------------------------------------------

const handleViewBookingDetail = async (id, option) => {
    try {
        console.log(id);
        const data = await axios.get(`http://localhost:3500/bookingDetail/${id}`);
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

const handleFeedBack = () => {
    context.auth.feedback = true
    console.log(context.auth)
}

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

return (
    <>
        <h1 style={{ textAlign: "center", marginTop: "100px" }}>
            DỊCH VỤ ĐÃ ĐẶT
        </h1>
        <Grid container>
            {statusList.map((value) => {
                return (
                    <Grid item xs={12 / statusList.length}>
                        <button
                            className="button-status"
                            style={buttonStyle}
                            onClick={(e) => handleLoadCartServiceById(value)}
                        >
                            {value}
                        </button>
                    </Grid>
                );
            })}
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
                                        onClick={(e) => handleViewBookingDetail(value._id)}
                                    >
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell align="left">
                                            {value.userId !== null ? value.userId.fullname : ""}
                                        </TableCell>
                                        <TableCell align="left">
                                            <DateFormat date={value.createdAt} />
                                        </TableCell>
                                        <TableCell align="left">{value.totalPrice}</TableCell>
                                        <TableCell align="left">{value.status}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <hr style={{ opacity: "0.5" }} />
            <Stack
                spacing={2}
                sx={{ float: "right" }}
                style={{ margin: "10px 0", justifyContent: "center" }}
            >
                <Pagination
                    count={pages}
                    page={currentPage}
                    color="primary"
                    onChange={handlePaging}
                />
            </Stack>
        </Paper>

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
                                <TableCell align="left">
                                    {
                                        status === 'Hoàn thành'
                                            ? (
                                                <Button
                                                    variant="contained"
                                                    margin="normal"
                                                    color="primary"
                                                    onClick={() => handleFeedBack(value.serviceId._id)}
                                                >
                                                    Đánh giá
                                                </Button>
                                            ) : ''
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })}
            </TableBody>
        </Table>

    </Grid >
                    </DialogContent >
    <DialogActions>
        <Button
            variant="contained"
            margin="normal"
            color="primary"
        // onClick={handleUpdate}
        >
            <TableCell component="th" scope="row">
                {index + 1}
            </TableCell>
            <TableCell align="left">
                {value.petId !== null ? value.petId.petName : ""}
            </TableCell>
            <TableCell align="left">
                {value.serviceId !== null
                    ? value.serviceId.serviceName
                    : ""}
            </TableCell>
            <TableCell align="left">{value.quantity}</TableCell>
            <TableCell align="left">
                {value.serviceId !== null
                    ? value.serviceId.price
                    : ""}
            </TableCell>
            <TableCell align="left"></TableCell>
        </TableRow>
        );
                    })}
    </TableBody>
              </Table >
            </Grid >
          </DialogContent >
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
        </Box >
      </Modal >
    </>
  );
}
