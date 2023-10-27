import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import ListSubheader from "@mui/material/ListSubheader";
import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Link } from "@mui/material";
import { toast } from "react-toastify";

const DrawerDashborad = () => {
  const navigate = useNavigate();
  const links = [
    { text: "Dashboard", path: "/" },
    { text: "Danh sách người dùng", path: "/user-list" },
    { text: "Danh sách dịch vụ", path: "/service-list" },
    { text: "Danh sách thú cưng", path: "/pet-list" },
  ];

  const links2 = [
    { text: "Dashboard", path: "/" },
    { text: "Danh sách người dùng", path: "/user-list" },
    { text: "Danh sách Dịch vụ", path: "/service-list" },
    { text: "Drafts", path: "/drafts" },
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3500/logout");
      // thông báo logout thành công và chuyển hướng về trang đăng nhập
      console.log(response);
      if (response.data.message === "Cookie cleared") {
        localStorage.removeItem("token"); // xóa token lưu trữ trong localStorage
        navigate("/sign-in"); // chuyển hướng về trang đăng nhập
        toast.success("Đăng nhập thành công!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Toolbar />
      <Divider />
      <List>
        <ListSubheader component="div" id="nested-list-subheader">
          List
        </ListSubheader>
        {links.map((link, index) => (
          <ListItem key={link.text} disablePadding>
            <ListItemButton component={Link} to={link.path}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={link.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={() => handleLogout()}>Logout</ListItemButton>
      </List>
    </>
  );
};

export default DrawerDashborad;
