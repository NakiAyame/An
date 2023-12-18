import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './TittleDashboard';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// import axios from "axios";

// import { useEffect, useState } from "react";


// function preventDefault(event) {
//   event.preventDefault();
// }



function DepositsDashboard(props) {

  const [selectedValue, setSelectedValue] = React.useState(null);
  const [previousValue, setPreviousValue] = React.useState(null);

  const handleSelectChange = (event) => {
    const currentValue = parseInt(event.target.value, 10);

    // Lưu giá trị trước đó vào previousValue
    setPreviousValue(selectedValue);

    // Cập nhật giá trị hiện tại
    setSelectedValue(currentValue);
  };

  const selectStyle = {
    width: '100%',
    padding: '16px 8px'
  }

  const numberToVND = (number) => {
    return number.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <React.Fragment>
      {props.props !== undefined ? (
        <>
          <Title>Doanh thu sản phẩm</Title>
          <Typography component="p" variant="h4">
            {props.props !== undefined ? numberToVND(Number(props.props)) : ''}
          </Typography>
        </>
      ) : ''
      }

      {props.total !== undefined ? (
        <>
          <Title>Sản phẩm đã bán</Title>
          <Typography component="p" variant="h4">
            {props.total !== undefined ? Number(props.total) : ''}
          </Typography>
        </>
      ) : ''
      }

      {props.raw !== undefined ? (
        <>
          <Title>Doanh thu theo tháng</Title>
          <div>
            <select style={selectStyle} onChange={handleSelectChange} value={selectedValue !== null ? selectedValue : ''}>
              <option value={0} disabled>Tháng 1</option>
              {props.raw.revenueByMonth.map((value) => (
                <option key={value.month} value={value.total}>
                  Tháng {value.month}
                </option>
              ))}
            </select>
            <p>Doanh thu: {selectedValue === null ? numberToVND(0) : numberToVND(selectedValue)}</p>
          </div>
        </>
      ) : ''
      }

      {props.staff !== undefined ? (
        <>
          <Title>Số lượng nhân viên</Title>
          <Typography component="p" variant="h4">
            {props.staff !== undefined ? Number(props.staff) : ''}
          </Typography>
        </>
      ) : ''
      }

      <Typography color="text.secondary" sx={{ flex: 1 }}>
      </Typography>
      <div>
        {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
      </div>
    </React.Fragment>
  );
}

export default DepositsDashboard