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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const SERVICE_NAME_REGEX =
  /^[ A-Za-zÀ-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ\s]{3,}$/;
const PRICE_REGEX = /^[1-9]{1}\d{3,}$/;

const ModalEditSerivce = (props) => {
  const { open, onClose, handUpdateEditTable, dataEditService } = props;

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

  // --------------------- HANLDE UPDATE SERVICE -----------------------------
  useEffect(() => {
    if (open) {
      setServiceName(dataEditService.serviceName);
      setCategoryId(dataEditService.categoryId);
      setDescription(dataEditService.description);
      setPrice(dataEditService.price);
      setStatus(dataEditService.status);
    }
  }, [dataEditService]);

  const handleEditService = async (serviceID) => {
    if (!validServiceName) {
      toast.error(
        "Tên dịch vụ không được nhập số, kí tự đặc biệt và phải có ít nhất 3 kí tự"
      );
    } else if (!validPrice) {
      toast.error(
        "Giá tiền phải có ít nhất 4 chữ số và số đầu tiên không phải số 0"
      );
    } else {
      try {
        const res = await axios.patch(`http://localhost:3500/service`, {
          id: serviceID,
          serviceName: serviceName,
          categoryId: categoryId,
          description: description,
          price: price,
          status: status,
        });
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success("Sửa dịch vụ thành công");
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
              onChange={(e) => handleValidationServiceName(e)}
              error={!validServiceName}
              helperText={validServiceName ? "" : "Hãy nhập tên dịch vụ"}
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
              error={!validPrice}
              helperText={validPrice ? "" : "Hãy nhập số tiền dịch vụ"}
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
              <FormControlLabel value={false} control={<Radio />} label="Ẩn" />
            </RadioGroup>
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
