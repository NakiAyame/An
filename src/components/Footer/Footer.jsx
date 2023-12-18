import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const FooterContainer = styled("footer")(({ theme }) => ({
  background: "linear-gradient(to right, #86CBE8, #DFDC9F, #E0A9E9, #CBC0EC)",
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
              Địa chỉ: Hoà lạc - Thạch thất - Hà Nội
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Liên hệ
            </Typography>
            <LinkWrapper>
              <li>
                <FooterLink href="https://www.facebook.com/honghanh0404">
                  Facebook
                </FooterLink>
              </li>
            </LinkWrapper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Về chúng tôi
            </Typography>
            <Button
              component={NavLink}
              to="/introduce-homepage"
              sx={{ my: 2, color: "white", display: "block", color: "black" }}
            >
              Giới thiệu
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Hỗ trợ
            </Typography>
            <LinkWrapper>
              <li>
                <FooterLink href="#">
                  Số điện thoại liên hệ: 0969176706
                </FooterLink>
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
