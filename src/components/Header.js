import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // state
  const [value, setValue] = useState();

  // logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#f5f0f6" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "#333",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontFamily: "Roboto", fontWeight: "bold" }}
        >
          WebDiaries
        </Typography>
        <Box display="flex" alignItems="center">
          {isLogin && (
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
              sx={{ flexGrow: 1 }}
            >
              <Tab
                label="Blogs"
                component={Link}
                to="/blogs"
                sx={{ color: "#333" }}
              />
              <Tab
                label="My Blogs"
                component={Link}
                to="/my-blogs"
                sx={{ color: "#333" }}
              />
              <Tab
                label="Create Blog"
                component={Link}
                to="/create-blog"
                sx={{ color: "#333" }}
              />
            </Tabs>
          )}
          {!isLogin ? (
            <Box display="flex" alignItems="center">
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#fff",
                  backgroundColor: "#f44336",
                  padding: "8px 16px",
                  margin:"10px 10px",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "#fff",
                  backgroundColor: "#00aaff",
                  padding: "8px 16px",
                  "&:hover": {
                    backgroundColor: "#0090d6",
                  },
                }}
              >
                Register
              </Button>
            </Box>
          ) : (
            <Button
              onClick={handleLogout}
              sx={{
                color: "#fff",
                backgroundColor: "#f44336",
                padding: "8px 16px",
                "&:hover": {
                  backgroundColor: "#d32f2f",
                },
              }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
