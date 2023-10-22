import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";

// const useStyles = makeStyles((theme) => ({
//     modal: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//     paper: {
//       backgroundColor: theme.palette.background.paper,
//       boxShadow: theme.shadows[5],
//       padding: theme.spacing(2, 4, 3),
//       borderRadius: '12px',
//     },
//   }));

const ModalAddSerivce = (props) => {
  const { open, onClose } = props;

  const [serviceName, setServiceName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreateService = async () => {
    try {
      const response = await axios.post("http://localhost:3500/service", {
        serviceName,
        title,
        description,
        price,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        console.log("Thành công!!", response);
        toast.success("Login successful");
        setServiceName("");
        setTitle("");
        setDescription("");
        setPrice(0);
        onClose();
      }
    } catch (error) {
      console.error(error);
      console.log("Error creating service.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: "12px",
          boxShadow: 5,
        }}
      >
        <Typography variant="h6" component="h2" id="modal-title" mb={2}>
          Thêm mới dịch vụ
        </Typography>
        <form>
          <TextField
            required
            fullWidth
            label="Tên dịch vụ"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Loại dịch vụ"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            fullWidth
            label="Thông tin"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            fullWidth
            label="Giá dịch vụ"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateService}
          >
            Tạo dịch vụ
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalAddSerivce;
