import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function DropDownService() {
  const [category, setCategory] = React.useState([]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  // --------------------- GET ALL CATEGORY SERVICE -----------------------------
  async function loadAllCategoryService() {
    try {
      const loadData = await axios.get(
        `http://localhost:3500/category/cateName/service`
      );
      if (loadData.error) {
        toast.error(loadData.error);
      } else {
        setCategory(loadData.data.data);
        toast.success("Login successful");
        console.log(loadData.data);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadAllCategoryService();
  }, []);

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label">Loại dịch vụ</InputLabel>
      <Select value={category} label="Loại dịch vụ" onChange={handleChange}>
        {category &&
          category.map((value, index) => {
            return (
              <MenuItem key={index} value={value._id}>
                {value.feature}
              </MenuItem>
            );
          })}
        {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
      </Select>
    </FormControl>
  );
}
