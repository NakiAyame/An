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

const SERVICE_NAME_REGEX =
  /^[ A-Za-zÀ-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ\s]{3,}$/;
const PRICE_REGEX = /^[1-9]{1}\d{3,}$/;
const QUANTITY_REGEX = /^[0-9]{1,}$/;

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

  // --------------------- VALIDATION -----------------------------
  const [validProductName, setValidProductName] = useState("");
  const [validPrice, setValidPrice] = useState("");
  const [validQuantity, setValidQuantity] = useState("");
  useEffect(() => {
    setValidProductName(
      SERVICE_NAME_REGEX.test(productName) && productName.trim() !== ""
    );
  }, [productName]);

  const handleValidationProductName = (e) => {
    setProductName(e.target.value);
  };

  useEffect(() => {
    setValidPrice(PRICE_REGEX.test(price));
  }, [price]);

  const handleValidationPrice = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    setValidQuantity(QUANTITY_REGEX.test(quantity));
  }, [quantity]);

  const handleValidationQuantity = (e) => {
    setQuantity(e.target.value);
  };

  // --------------------- HANDLE UPDATE PRODUCT -----------------------------
  useEffect(() => {
    if (open) {
      setProductName(dataEditProduct.productName);
      setQuantity(dataEditProduct.quantity);
      setPrice(dataEditProduct.price);
    }
  }, [dataEditProduct]);

  const handleEditProduct = async (productID) => {
    if (!validProductName) {
      toast.error(
        "Tên sản phẩm không được nhập số, kí tự đặc biệt và phải có ít nhất 3 kí tự"
      );
    } else if (!validQuantity) {
      toast.error("Số lượng không được để trống");
    } else if (!validPrice) {
      toast.error(
        "Giá tiền phải có ít nhất 4 chữ số và số đầu tiên không phải số 0"
      );
    } else {
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
          handUpdateEditTable();
          onClose();
        }
      } catch (err) {
        toast.error(err.message); // xuất thông báo lỗi ra màn hình
      }
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
              onChange={(e) => handleValidationProductName(e)}
              error={!validProductName}
              helperText={validProductName ? "" : "Hãy nhập tên sản phẩm"}
            />
            <TextField
              // required
              fullWidth
              label="Số lượng"
              margin="normal"
              type="number"
              value={quantity}
              onChange={(e) => handleValidationQuantity(e)}
              error={!validQuantity}
              helperText={validQuantity ? "" : "Hãy nhập số lượng sản phẩm"}
            />

            <TextField
              required
              fullWidth
              label="Giá tiền sản phẩm"
              type="number"
              margin="normal"
              value={price}
              onChange={(e) => handleValidationPrice(e)}
              error={!validPrice}
              helperText={validPrice ? "" : "Hãy nhập giá tiền sản phẩm"}
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
