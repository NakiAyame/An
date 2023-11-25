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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Input } from "@mui/material";

const SERVICE_NAME_REGEX =
  /^[ A-Za-z0-9À-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ,\s]{3,}$/;
const PRICE_REGEX = /^[1-9]{1}\d{3,}$/;
const QUANTITY_REGEX = /^[0-9]{1,}$/;

const ModalEditProduct = (props) => {
  const {
    open,
    onClose,
    handUpdateEditTable,
    dataEditProduct,
    category,
    page,
  } = props;

  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
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

  // --------------------- HANDLE CHANGE IMAGE -----------------------------
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log("Kiểm tra image: ", e.target.files);
  };

  // --------------------- HANDLE HANLDE UPLOAD IMAGE PRODUCT -----------------------------
  const handleUpload = async () => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(
          `http://localhost:3500/product/upload`,
          formData
        );
        console.log("Response data:", response.data.image);
        const imagePath = response.data.image;

        if (imagePath) {
          console.log("Đã tải ảnh lên:", imagePath);
          toast.success("Thêm ảnh thành công");
          handleEditProduct(imagePath);
        } else {
          console.log("Lỗi: Không có đường dẫn ảnh sau khi tải lên.");
        }
      } else {
        console.log("Vui lòng chọn ảnh trước khi tải lên.");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
    }
  };

  // --------------------- HANDLE UPDATE PRODUCT -----------------------------
  useEffect(() => {
    if (open) {
      setProductName(dataEditProduct.productName);
      setCategoryId(dataEditProduct.categoryId);
      setDescription(dataEditProduct.description);
      setQuantity(dataEditProduct.quantity);
      setPrice(dataEditProduct.price);
      setImage(dataEditProduct.productImage);
    }
  }, [dataEditProduct]);

  const handleEditProduct = async (productID) => {
    if (!validProductName) {
      toast.error(
        "Tên sản phẩm không được nhập kí tự đặc biệt và phải có ít nhất 3 kí tự"
      );
    } else if (!validQuantity) {
      toast.error("Số lượng không được để trống");
    } else if (!validPrice) {
      toast.error("Giá tiền phải có ít nhất 4 chữ số và phải lớn hơn 0");
    } else {
      try {
        const res = await axios.patch(`http://localhost:3500/product`, {
          id: productID,
          productName: productName,
          categoryId: categoryId,
          description: description,
          quantity: quantity,
          price: price,
          // productImage: imagePath,
        });
        if (res.data.error) {
          toast.error("Lỗi Err", res.data.error);
        } else {
          toast.success("Sửa thông tin sản phẩm thành công");
          handUpdateEditTable(page);
          onClose();
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  // --------------------- HANDLE CHANGE CATEGORY PRODUCT -----------------------------
  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Check ID cate add Product", selectedCategory);
    setCategoryId(selectedCategory);
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
              // error={!validProductName}
              // helperText={validProductName ? "" : "Hãy nhập tên sản phẩm"}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-select-small-label">
                Chọn loại sản phẩm
              </InputLabel>
              <Select
                label="Loại sản phẩm"
                value={categoryId}
                onChange={handleChange}
              >
                {category &&
                  category.map((value) => {
                    return (
                      <MenuItem
                        key={value._id}
                        value={value._id}
                        // onClick={(e) => hanldeClickCategory(e.target.value)}
                      >
                        {value.feature}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>

            <TextField
              // required
              fullWidth
              label="Số lượng"
              margin="normal"
              type="number"
              value={quantity}
              onChange={(e) => handleValidationQuantity(e)}
              // error={!validQuantity}
              // helperText={validQuantity ? "" : "Hãy nhập số lượng sản phẩm"}
            />

            <TextField
              required
              fullWidth
              label="Giá tiền sản phẩm"
              type="number"
              margin="normal"
              value={price}
              onChange={(e) => handleValidationPrice(e)}
              // error={!validPrice}
              // helperText={validPrice ? "" : "Hãy nhập giá tiền sản phẩm"}
            />

            <TextField
              label="Thông tin sản phẩm"
              fullWidth
              placeholder="Điền thông tin sản phẩm ở đây"
              multiline
              rows={4}
              margin="normal"
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Input
              type="file"
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            {image && (
              <img
                src={image}
                alt="Ảnh sản phẩm"
                style={{ maxWidth: "100%" }}
              />
            )}

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
