import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useEffect } from "react";
import ServiceDetail from "../../../components/Modal/ModalDetaiService";

const ServiceDetailModal = ({ open, onClose, serviceId }) => {
  const [service, setService] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     const fetchService = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:3500/service/${serviceId}`
  //         );
  //         setService(response.data);
  //         setIsLoading(false);
  //       } catch (err) {
  //         toast.error(err.message);
  //       }
  //     };
  //     if (open) {
  //       fetchService();
  //     }
  //   }, [serviceId, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
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
      <ServiceDetail service={serviceId} />
    </Dialog>
  );
};

export default ServiceDetailModal;
