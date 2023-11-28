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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";

const SERVICE_NAME_REGEX =
  /^[ A-Za-zÀ-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ\s]{3,}$/;
const PRICE_REGEX = /^[1-9]{1}\d{3,}$/;

const ModalEditSerivce = (props) => {
  const {
    open,
    onClose,
    handUpdateEditTable,
    dataEditService,
    category,
    page,
  } = props;
  const currentDate = dayjs();
  const [serviceName, setServiceName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState(true);
  const [discount, setDiscount] = useState(0);
  const [saleStartTime, setSaleStartTime] = useState(currentDate);
  const [saleEndTime, setSaleEndTime] = useState(currentDate);
  const [isStartDateVisible, setIsStartDateVisible] = useState(false);

  // --------------------- HANLDE CHANGE STATUS -----------------------------
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log(status);
  };

  // --------------------- HANLDE CHANGE DISCOUNT -----------------------------
  const handleDiscountChange = (event) => {
    const { value } = event.target;
    const numericValue = parseInt(value, 10);

    setDiscount(value);

    if (numericValue >= 1 && numericValue <= 100) {
      setSaleStartTime();
      setSaleEndTime();
      setIsStartDateVisible(true);
    } else {
      setIsStartDateVisible(false);
    }
  };

  // --------------------- HANLDE CHANGE START DATE -----------------------------
  const handleStartDateChange = (date) => {
    setSaleStartTime(date);
  };

  const handleEndDateChange = (date) => {
    setSaleEndTime(date);
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
      setDiscount(dataEditService.discount);
      setSaleStartTime(dataEditService.saleStartTime);
      setSaleEndTime(dataEditService.saleEndTime);
    }
  }, [dataEditService]);

  const handleEditService = async (serviceID) => {
    if (discount === "") {
      toast.error("% giảm giá không được để trống");
    } else if (!validServiceName) {
      toast.error(
        "Tên dịch vụ không được nhập số, kí tự đặc biệt và phải có ít nhất 3 kí tự"
      );
    } else if (discount < 0) {
      toast.error("% giảm giá không được âm ");
    } else if (discount > 100) {
      toast.error("% giảm giá không được lớn hơn 100");
    } else if (saleEndTime.isBefore(saleStartTime)) {
      toast.error(
        "Ngày bắt đầu giảm giá không được sau hoặc bằng ngày kết thúc giảm giá "
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
          discount: discount,
          saleStartTime: saleStartTime,
          saleEndTime: saleEndTime,
        });
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success("Sửa dịch vụ thành công");
          handUpdateEditTable(page);
          onClose();
        }
      } catch (err) {
        toast.error(err.message); // xuất thông báo lỗi ra màn hình
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
              // error={!validServiceName}
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
              // error={!validPrice}
              // helperText={validPrice ? "" : "Hãy nhập số tiền dịch vụ"}
            />

            <TextField
              required
              fullWidth
              label="Giảm giá(%)"
              type="number"
              margin="normal"
              value={discount}
              onChange={handleDiscountChange}
            />
            {isStartDateVisible && (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Ngày bắt đầu giảm giá"
                    value={saleStartTime}
                    onChange={handleStartDateChange}
                    // minDate={currentDate}
                    // maxDate={currentDate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <DateTimePicker
                    label="Ngày kết thúc giảm giá"
                    value={saleEndTime}
                    onChange={handleEndDateChange}
                  />
                </Grid>
              </Grid>
            )}

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
