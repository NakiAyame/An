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

const PET_NAME_REGEX =
  /^[ A-Za-zÀ-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ\s]{2,}$/;
const PET_HEIH_REGEX = /^\d*(\.\d+)?$/;

const ModalEditPet = (props) => {
  const { open, onClose, dataEditPet, handUpdateEditTable, page, category } =
    props;

  const [userId, setUserId] = useState("");
  const [petName, setPetName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [rank, setRank] = useState(0);
  const [color, setColor] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [status, setStatus] = useState(true);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    console.log(status);
  };

  // --------------------- VALIDATION -----------------------------
  const [valid, setValid] = useState("");
  const [validHeight, setValidHeight] = useState("");
  const [validWeight, setValidWeight] = useState("");
  useEffect(() => {
    setValid(PET_NAME_REGEX.test(petName));
  }, [petName]);

  const handleValidationPetName = (e) => {
    setPetName(e.target.value);
  };

  useEffect(() => {
    setValidHeight(PET_HEIH_REGEX.test(height));
  }, [height]);

  const handleValidationPetHeight = (e) => {
    setHeight(e.target.value);
  };

  useEffect(() => {
    setValidWeight(PET_HEIH_REGEX.test(weight));
  }, [weight]);

  const handleValidationPetWeight = (e) => {
    setWeight(e.target.value);
  };

  // --------------------- HANDLE UPDATE PET -----------------------------
  useEffect(() => {
    if (open) {
      setUserId(dataEditPet.userId);
      setPetName(dataEditPet.petName);
      setCategoryId(dataEditPet.categoryId);
      setRank(dataEditPet.rank);
      setStatus(dataEditPet.status);
      setColor(dataEditPet.color);
      setHeight(dataEditPet.height);
      setWeight(dataEditPet.weight);
    }
  }, [dataEditPet]);

  const handleEditPet = async (petID) => {
    if (petName === "") {
      toast.error("Tên thú cưng không được để trống");
    } else if (height === "") {
      toast.error("Chiều cao thú cưng không được để trống");
    } else if (weight === "") {
      toast.error("Cân nặng thú cưng không được để trống");
    } else if (!valid) {
      toast.error(
        "Tên thú cưng không được nhập số, kí tự đặc biệt và phải có ít nhất 2 kí tự"
      );
    } else if (!validHeight) {
      toast.error("Chiều cao thú cưng phải là số nguyên hoặc số thập phân");
    } else if (!validWeight) {
      toast.error("Cân nặng thú cưng phải là số nguyên hoặc số thập phân");
    } else if (categoryId == "") {
      toast.error("Bạn phải chọn loại thú cưng mình muốn");
    } else {
      try {
        const res = await axios.patch(`http://localhost:3500/pet`, {
          id: petID,
          userId: userId,
          petName: petName,
          categoryId: categoryId,
          rank: rank,
          status: status,
          color: color,
          height: height,
          weight: weight,
        });
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.success("Sửa thông tin thú cưng thành công");
          handUpdateEditTable(page);
          onClose();
        }
      } catch (err) {
        toast.error(err.message); // xuất thông báo lỗi ra màn hình
      }
    }
  };

  // --------------------- HANDLE CHANGE CATEGORY PET -----------------------------
  const handleChangePet = (e) => {
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
          Sửa thông tin thú cưng
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
              required
              fullWidth
              label="Id chủ thú cưng"
              margin="normal"
              value={userId}
              sx={{ display: "none" }}
              onChange={(e) => setUserId(e.target.value)}
              // defaultValue={dataEditPet.userId.fullname}
            />
            <TextField
              required={true}
              fullWidth
              label="Tên thú cưng"
              margin="normal"
              value={petName}
              onChange={(e) => handleValidationPetName(e)}
              error={!valid}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="demo-select-small-label">
                Chọn loại thú cưng
              </InputLabel>
              <Select
                label="Loại sản phẩm"
                value={categoryId}
                onChange={handleChangePet}
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
              fullWidth
              label="Chiều cao"
              margin="normal"
              value={height}
              onChange={(e) => handleValidationPetHeight(e)}
            />

            <TextField
              fullWidth
              label="Cân nặng"
              margin="normal"
              value={weight}
              onChange={(e) => handleValidationPetWeight(e)}
            />

            <TextField
              required={true}
              fullWidth
              label="Cấp thú cưng ban đầu"
              type="number"
              margin="normal"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            <RadioGroup
              value={status}
              onChange={handleStatusChange}
              row
              aria-label="status"
              name="status"
              sx={{ display: "none" }}
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
            variant="contained"
            margin="normal"
            color="primary"
            onClick={() => handleEditPet(dataEditPet._id)}
          >
            Sửa
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalEditPet;
