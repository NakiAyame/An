import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ModalAddSerivce = (props) => {
  const { open, onClose, handUpdateTable } = props;

  const [serviceName, setServiceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleCreateService = async () => {
    try {
      const response = await axios.post("http://localhost:3500/service", {
        serviceName: serviceName,
        categoryId: categoryId,
        description: description,
        price: price,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        console.log("Thành công!!", response);
        toast.success("Thêm mới dịch vụ thành công!");
        setServiceName("");
        setCategoryId("");
        setDescription("");
        handUpdateTable({
          serviceName: serviceName,
          categoryId: categoryId,
          description: description,
          price: price,
        });
        setPrice(0);
        onClose();
      }
    } catch (error) {
      console.error(error);
      console.log("Error creating service.");
      toast.error(error.message);
    }
  };

  return (
    <Dialog
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
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Sửa dịch vụ
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <form>
            <TextField
              // required
              fullWidth
              label="Tên dịch vụ"
              margin="normal"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
            <TextField
              // required
              fullWidth
              label="Loại dịch vụ"
              margin="normal"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
            <TextField
              label="Thông tin dịch vụ"
              fullWidth
              placeholder="MultiLine with rows: 2 and rowsMax: 4"
              multiline
              rows={4}
              margin="normal"
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <TextField
              required
              fullWidth
              label="Giá dịch vụ"
              type="number"
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            margin="normal"
            color="primary"
            onClick={handleCreateService}
          >
            Tạo dịch vụ
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalAddSerivce;
