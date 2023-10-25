import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const ModalEditSerivce = (props) => {
  const { open, onClose, handUpdateEditTable, dataEditService } = props;

  const [serviceName, setServiceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (open) {
      setServiceName(dataEditService.serviceName);
      setCategoryId(dataEditService.categoryId);
      setDescription(dataEditService.description);
      setPrice(dataEditService.price);
    }
  }, [dataEditService]);

  const handleEditService = async (serviceID) => {
    try {
      const res = await axios.patch(`http://localhost:3500/service`, {
        id: serviceID,
        serviceName: serviceName,
        categoryId: categoryId,
        description: description,
        price: price,
      });
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Sửa dịch vụ thành công");
        handUpdateEditTable({
          id: serviceID,
          serviceName: serviceName,
          categoryId: categoryId,
          description: description,
          price: price,
        });
        onClose();
      }
    } catch (err) {
      toast.error(err.message); // xuất thông báo lỗi ra màn hình
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
            autoFocus
            variant="contained"
            margin="normal"
            color="primary"
            onClick={() => handleEditService(dataEditService._id)}
          >
            Lưu thay đổi
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalEditSerivce;
