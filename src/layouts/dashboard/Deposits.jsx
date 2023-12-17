import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './TittleDashboard';

// import axios from "axios";

// import { useEffect, useState } from "react";


// function preventDefault(event) {
//   event.preventDefault();
// }



export default function DepositsDashboard(props) {
  return (
    <React.Fragment>
      {props.props !== undefined ? (
        <>
          <Title>Doanh thu sản phẩm</Title>
          <Typography component="p" variant="h4">
            {props.props !== undefined ? Number(props.props).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
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

      {props.customer !== undefined ? (
        <>
          <Title>Số lượng người dùng</Title>
          <Typography component="p" variant="h4">
            {props.customer !== undefined ? Number(props.customer) : ''}
          </Typography>
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