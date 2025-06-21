import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
const pages = [
  {
    title: "Blog",
    url: "/blog",
  },
  {
    title: "All Blog",
    url: "/allblog",
  },
  {
    title: "Create Blog",
    url: "/createblog",
  },
  {
    title: "Signout",
    url: "/",
  },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signout = () => {
    localStorage.clear();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              My blogs
            </Typography>
          </Link>

          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              My Blogs
            </Typography>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "end" },
            }}
          >
            {/* desktop manu */}
            {pages.map((page) => (
              <Link
                key={page.title}
                to={page.url}
                 onClick={page.title === "Signout" ? signout : null}
                style={{ textDecoration: "none" }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            {pages.map((page) => (
              <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                <Link to={page.url} style={{ textDecoration: "none" }}>
                  {" "}
                  <Typography sx={{ textAlign: "center" }}>
                    {page.title}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", justifyContent: "end" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
