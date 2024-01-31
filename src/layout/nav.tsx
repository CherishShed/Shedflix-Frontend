import React, { useEffect } from "react";
import { snackBarStore, userStore } from "../context/states";
import {
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  Fade,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function Nav() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = userStore((store) => store.user);
  const isAuthenticated = userStore((store) => store.isAuthenticated);
  const logoutUser = userStore((store) => store.logoutUser);
  const openSnackBar = snackBarStore((store) => store.openSnackBar);
  const setUser = userStore((store) => store.loginUser);
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/userDetails", {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((userDetails) => {
        console.log(userDetails.data);
        setUser(userDetails.data.user);
      });
  }, []);
  return (
    <nav className="flex items-center !bg-transparent absolute top-0 z-20 justify-between p-2 px-5 w-full">
      <Link to={"/"} className="logo m-0 !bg-transparent">
        S<span className="text-5xl">HEDFLI</span>X
      </Link>
      {!isAuthenticated ? (
        <div className="flex gap-2">
          <Link
            to={"/login"}
            className="p-2 bg-transparent  w-32 rounded-sm text-white text-center"
          >
            login
          </Link>
          <Link
            to={"/signup"}
            className="p-2 bg-red-600 text-white w-32 rounded-sm text-center"
          >
            Sign Up
          </Link>
        </div>
      ) : (
        <div>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {user?.first_name[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <p className="text-center">
              {user?.first_name} {user?.last_name}
            </p>
            <MenuItem>
              <Link to={"/profile"}>My List</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem
              onClick={() => {
                axios
                  .get("http://localhost:8081/api/logout")
                  .then((response) => {
                    localStorage.removeItem("accessToken");
                    logoutUser();
                    openSnackBar(response.data.message, "success");
                  })
                  .catch((error) => {
                    openSnackBar(error.response.data.message, "error");
                  });
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </nav>
  );
}

export default Nav;
