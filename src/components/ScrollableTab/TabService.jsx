import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ScrollableTabService(props) {
  const { category, handUpdateEditTable } = props;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = React.useState(
    category.length > 0 ? category[0]._id : ""
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const selectedCategoryObj = category.find((obj) => obj._id === newValue);
    if (selectedCategoryObj) {
      setSelectedCategory(selectedCategoryObj._id);
      handUpdateEditTable(selectedCategoryObj._id);
    } else {
      setSelectedCategory("");
      handUpdateEditTable("");
    }
  };

  return (
    <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="Tất cả dịch vụ" />
        {category &&
          category.map((value) => {
            return (
              <Tab key={value._id} value={value._id} label={value.feature} />
            );
          })}
      </Tabs>
    </Box>
  );
}
