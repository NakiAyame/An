import React from "react";

import { Divider, Avatar, Grid, Paper, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Comments({ value }) {
  let id = value._id;
  const [data, setData] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // ----------------------------------- API GET FEEDBACK BY ID PRODUCT --------------------------------
  useEffect(() => {
    loadAllFeedbackById();
  }, []);

  const loadAllFeedbackById = async () => {
    console.log("Check id", id);
    try {
      const loadDataFeedback = await axios.get(
        `http://localhost:3500/feedback/product?productId=${id}&limit=3`
      );
      if (loadDataFeedback.error) {
        toast.error(loadDataFeedback.error);
      } else {
        setTotalPages(loadDataFeedback.data.pages);
        setData(loadDataFeedback.data.docs);
        setTotalProducts(loadDataFeedback.data.limit);
        console.log(loadDataFeedback.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Paper sx={{ padding: "40px 20px" }}>
        {data &&
          data.map((fb) => {
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <Typography sx={{ margin: 0, textAlign: "left" }}>
                  {fb.userId !== null ? fb.userId : ""}
                </Typography>
                <p sx={{ textAlign: "left" }}>{fb.comment}</p>
                <p sx={{ textAlign: "left", color: "gray" }}>{fb.star}</p>
              </Grid>
            </Grid>;
          })}
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
      </Paper>
    </>
  );
}
