import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Axios
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from 'react';

export default function BasicTable() {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function loadAllUser() {
            try {
                const loadData = await axios.get("http://localhost:3500/user");
                if (loadData.error) {
                    toast.error(loadData.error);
                } else {
                    setData(loadData.data);
                    toast.success("Login successful");
                    console.log(loadData.data)
                }
            } catch (err) {
                console.log(err);
            }
        };
        loadAllUser()
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Address</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.map((value, index) => {
                        return(
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index}
                            </TableCell>
                            <TableCell align="right">{value.fullname}</TableCell>
                            <TableCell align="right">{value.phone}</TableCell>
                            <TableCell align="right">{value.gender}</TableCell>
                            <TableCell align="right">{value.email}</TableCell>
                            <TableCell align="right">{value.address}</TableCell>
                        </TableRow>
                    )})}

                </TableBody>
            </Table>
        </TableContainer>
    );
}
