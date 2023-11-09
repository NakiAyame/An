import { useState, useEffect } from "react";
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

const SERVICE_NAME_REGEX =
  /^[ A-Za-zÀ-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ\s]{3,}$/;
const PRICE_REGEX = /^[1-9]{1}\d{3,}$/;

const ModalAddSerivce = (props) => {
  const { open, onClose, handUpdateTable, category } = props;

  const [serviceName, setServiceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(true);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log(status);
  };

  // --------------------- VALIDATION -----------------------------
  const [validServiceName, setValidServiceName] = useState("");
  const [validPrice, setValidPrice] = useState("");
  useEffect(() => {
    setValidServiceName(
      SERVICE_NAME_REGEX.test(serviceName) && serviceName.trim() !== ""
    );
  }, [serviceName]);

  const handleValidationServiceName = (e) => {
    setServiceName(e.target.value);
  };

  useEffect(() => {
    setValidPrice(PRICE_REGEX.test(price));
  }, [price]);

  const handleValidationPrice = (e) => {
    setPrice(e.target.value);
  };

  // --------------------- HANDLE CREATE SERVICE -----------------------------
  const handleCreateService = async () => {
    console.log(
      "Check data truyền vào",
      serviceName,
      categoryId,
      description,
      price,
      status
    );
    if (!validServiceName) {
      toast.error(
        "Tên dịch vụ không được nhập số, kí tự đặc biệt và phải có ít nhất 3 kí tự"
      );
    }
    if (!validPrice) {
      toast.error("Giá tiền phải có ít nhất 4 chữ số và phải lớn hơn 0");
    } else {
      try {
        const response = await axios.post("http://localhost:3500/service", {
          serviceName,
          categoryId,
          description,
          price,
          status,
        });
        if (response.error) {
          toast.error(response.error);
        } else {
          console.log("Thành công!!", response);
          toast.success("Thêm mới dịch vụ thành công!");
          setServiceName("");
          setCategoryId("");
          setDescription("");
          setPrice();
          handUpdateTable();
          onClose();
        }
      } catch (error) {
        console.error(error);
        console.log("Error creating service.");
        toast.error(error.message);
      }
    }
  };

  // --------------------- HANDLE CHANGE CATEGORY SERVICE -----------------------------
  const handleChange = (e) => {
    const selectedCategory = e.target.value;
    console.log("Check ID cate add Service", selectedCategory);
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
          Thêm dịch vụ
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
              onChange={(e) => handleValidationServiceName(e)}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-select-small-label">
                Chọn loại dịch vụ
              </InputLabel>
              <Select
                label="Loại dịch vụ"
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
              label="Thông tin dịch vụ"
              fullWidth
              placeholder="Điền thông tin dịch vụ ở đây"
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
              onChange={(e) => handleValidationPrice(e)}
            />
            <RadioGroup
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
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Không hoạt động"
              />
            </RadioGroup>
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
