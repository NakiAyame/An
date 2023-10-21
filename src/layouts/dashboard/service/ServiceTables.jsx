import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Button, ButtonGroup } from "@mui/material";

export default function ServiceTable() {
  const [data, setData] = useState([]);

  const booleanToString = (value) => {
    return value ? "Yes" : "No";
  };

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    async function loadAllUser() {
      try {
        const loadData = await axios.get("http://localhost:3500/service");
        if (loadData.error) {
          toast.error(loadData.error);
        } else {
          setData(loadData.data);
          toast.success("Login successful");
          console.log(loadData.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadAllUser();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
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
              return (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{value.serviceName}</TableCell>
                  <TableCell align="right">{value.title}</TableCell>
                  <TableCell align="right">{value.description}</TableCell>
                  <TableCell align="right">
                    {numberToVND(value.price)}
                  </TableCell>
                  <TableCell align="right">
                    {booleanToString(value.status)}
                  </TableCell>
                  <TableCell align="right">
                    <ButtonGroup variant="contained" fullWidth>
                      <Button variant="contained" color="success">
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
  );
}
