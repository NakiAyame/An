import { useEffect, useState } from "react";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const ModalEditProduct = (props) => {
  const { open, onClose, handUpdateEditTable, dataEditProduct } = props;

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  //   const [status, setStatus] = useState(true);

  //   const handleStatusChange = (event) => {
  //     setStatus(event.target.value);
  //     console.log(status);
  //   };

  useEffect(() => {
    if (open) {
      setProductName(dataEditProduct.productName);
      setQuantity(dataEditProduct.quantity);
      setPrice(dataEditProduct.price);
    }
  }, [dataEditProduct]);

  // --------------------- HANDLE UPDATE PRODUCT -----------------------------
  const handleEditProduct = async (productID) => {
    try {
      const res = await axios.patch(`http://localhost:3500/product`, {
        id: productID,
        productName: productName,
        quantity: quantity,
        price: price,
      });
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success("Sửa thông tin sản phẩm thành công");
        handUpdateEditTable({
          id: productID,
          productName: productName,
          quantity: quantity,
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
          Sửa thông tin sản phẩm
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
              label="Tên sản phẩm"
              margin="normal"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              // required
              fullWidth
              label="Số lượng"
              margin="normal"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <TextField
              required
              fullWidth
              label="Giá tiền sản phẩm"
              type="number"
              margin="normal"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            {/* Status */}
            {/* <RadioGroup
              value={status}
              onChange={handleStatusChange}
              row
              aria-label="status"
              name="status"
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Hoạt động"
              />
              <FormControlLabel value={false} control={<Radio />} label="Ẩn" />
            </RadioGroup> */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            margin="normal"
            color="primary"
            onClick={() => handleEditProduct(dataEditProduct._id)}
          >
            Sửa
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalEditProduct;
