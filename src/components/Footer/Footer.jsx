import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

const FooterContainer = styled("footer")(({ theme }) => ({
  background: "linear-gradient(to right, #ADD8E6, #FFFF99, #FFC0CB)",
  color: "#000",
  padding: theme.spacing(6, 0),
}));

const LinkWrapper = styled("ul")(({ theme }) => ({
  margin: theme.spacing(1, 0),
  padding: "0",
  listStyle: "none",
}));

const FooterLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1, 1.5),
  color: "#000",
  textDecoration: "none",
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Dịch vụ chăm sóc thú cưng
            </Typography>
            <Typography variant="body2" component="p">
              Địa chỉ: Hà Nội
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <LinkWrapper>
              <li>
                <FooterLink href="#">Facebook</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Instagram</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Twitter</FooterLink>
              </li>
            </LinkWrapper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Về chúng tôi
            </Typography>
            <LinkWrapper>
              <li>
                <FooterLink href="#">Giới thiệu</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Điều khoản sử dụng</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Bảo mật thông tin</FooterLink>
              </li>
            </LinkWrapper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Hỗ trợ
            </Typography>
            <LinkWrapper>
              <li>
                <FooterLink href="#">Trung tâm trợ giúp</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Liên hệ hỗ trợ</FooterLink>
              </li>
              <li>
                <FooterLink href="#">Hỏi đáp</FooterLink>
              </li>
            </LinkWrapper>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="inherit"
          align="center"
          sx={{ mt: 2 }}
        >
          {"© "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
