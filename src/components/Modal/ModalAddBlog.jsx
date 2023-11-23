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
import { Container, Input } from "@mui/material";

const Title_REGEX =
  /^[ A-Za-zÀ-Ỹà-ỹĂ-Ắă-ằẤ-Ứấ-ứÂ-Ấâ-ấĨ-Ỹĩ-ỹĐđÊ-Ểê-ểÔ-Ốô-ốơ-ởƠ-Ớơ-ớƯ-Ứư-ứỲ-Ỵỳ-ỵ\s]{3,}$/;
const PRICE_REGEX = /^[1-9]{1}\d{3,}$/;

const ModalAddBlog = (props) => {
  const { open, onClose, handUpdateTable, page, uId } = props;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [image, setImage] = useState(null);

  //   const handleStatusChange = (event) => {
  //     setStatus(event.target.value);
  //     console.log(status);
  //   };

  // --------------------- VALIDATION -----------------------------
  const [validTitle, setValidTitle] = useState("");
  useEffect(() => {
    setValidTitle(Title_REGEX.test(title) && title.trim() !== "");
  }, [title]);

  const handleValidationTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    console.log("Kiểm tra image: ", e.target.files);
  };

  // --------------------- HANDLE HANLDE UPLOAD IMAGE BLOG -----------------------------
  const handleUpload = async () => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(
          `http://localhost:3500/blog/upload`,
          formData
        );
        console.log("Response data:", response.data.docs.image);
        const imagePath = response.data.docs.image;

        if (imagePath) {
          console.log("Đã tải ảnh lên:", imagePath);
          toast.success("Thêm ảnh thành công");
          handleCreateBlog(imagePath);
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

  // --------------------- HANDLE CREATE BLOG -----------------------------
  const handleCreateBlog = async (imageUrl) => {
    console.log("Check data truyền vào", title, content, userId, imageUrl);
    if (!validTitle) {
      toast.error(
        "Tiêu đề không được nhập số, kí tự đặc biệt và phải có ít nhất 3 kí tự"
      );
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3500/blog/create-blog",
          {
            title,
            content,
            userId: uId,
            imageUrl: imageUrl,
          }
        );
        if (response.error) {
          toast.error(response.error);
        } else {
          console.log("Thành công!!", response);
          toast.success("Thêm mới dịch vụ thành công!");
          setTitle("");
          setContent("");
          setImage("");
          handUpdateTable(page);
          onClose();
        }
      } catch (error) {
        console.error(error);
        console.log("Error creating service.");
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (open) {
      setUserId(uId);
    }
  }, [uId]);

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
          Thêm bài đăng
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
              value={uId}
              onChange={(e) => setUserId(e.target.value)}
              //   sx={{ display: "none" }}
            />
            <TextField
              // required
              fullWidth
              label="Tiêu đề"
              margin="normal"
              value={title}
              onChange={(e) => handleValidationTitle(e)}
            />

            <TextField
              label="Thông tin bài đăng"
              fullWidth
              placeholder="Điền thông tin bài đăng ở đây"
              multiline
              rows={4}
              margin="normal"
              maxRows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
              <Input
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleImageChange}
                style={{ marginBottom: "1rem" }}
              />
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
              >
                Tải lên
              </Button> */}
            </Container>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            margin="normal"
            color="primary"
            onClick={handleUpload}
          >
            Tạo
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ModalAddBlog;
