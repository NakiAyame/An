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

export default function PetTable() {
  const DEFAULT_PAGE = 1;

  const [option, setOption] = useState("");

  const [data, setData] = useState([]);

  
  const [role, setRole] = useState("");
  const [gender, setGender] = useState(true);
  const [fullname, setFullName] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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
  const handleUpdate = (event) => {
    setOption("update");
    handleOpen();

    console.log(event);
  };

  // --------------------- HANDLE DELETE -----------------------------
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const data = await axios.delete("http://localhost:3500/user", {
        id,
      });
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
      }
    } catch (err) {
      console.log(err);
    }
  };
  // })

  // ----------------------------------- API GET ALL USER --------------------------------
  useEffect(() => {
    async function loadAllUser(page) {
      try {
        const loadData = await axios.get(
          `http://localhost:3500/user?page=${page}`
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
    loadAllUser(DEFAULT_PAGE);
  }, []);
  // ----------------------------------------------------------------

  return (
    <>
      <ButtonCustomize
        onClick={handleCreate}
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
                      {(value.gender = true ? "Nam" : "Nữ")}
                    </TableCell>
                    <TableCell align="right">{value.email}</TableCell>
                    <TableCell align="right">{value.address}</TableCell>
                    <TableCell align="right">
                      <ButtonCustomize
                        onClick={(e) => handleUpdate(value._id)}
                        variant="contained"
                        // component={RouterLink}
                        nameButton="Cập nhật"
                        fullWidth
                      />
                    </TableCell>
                    {/* <TableCell align="right">
                                        <ButtonCustomize
                                            onClick={(e) => handleDelete(value._id)}
                                            variant="contained"
                                            // component={RouterLink}
                                            nameButton="Xoá"
                                            fullWidth
                                        />
                                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
