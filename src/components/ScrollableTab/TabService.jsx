import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ScrollableTabService(props) {
  const { category, handUpdateEditTable, handleLoadAllService } = props;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    if (newValue === "all") {
      handleLoadAllService();
    } else {
      setValue(newValue);
      console.log(newValue);
      setSelectedCategory(newValue);
      handUpdateEditTable(newValue);
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
        <Tab label="Tất cả dịch vụ" value="all" />
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
