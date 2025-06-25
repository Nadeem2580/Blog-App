import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Userlogin from "../../assets/userlogin.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastAlert } from "../../Utils/Utility";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Fireabse";
import { doc, getDoc } from "firebase/firestore";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const navigate = useNavigate();
  const loginHandler = async () => {
    if (!email) {
      ToastAlert({
        type: "error",
        message: "Email required",
      });
      return;
    }

    if (!password) {
      ToastAlert({
        type: "error",
        message: "Password required",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, password);
      const uid = response.user.uid;
      const docRef = doc(db, "users", uid);
      const userDataGet = await getDoc(docRef);
      if (userDataGet.data().isLogin == false) {
        ToastAlert({
          type: "error",
          message: "You are disabled by admin",
        });
        setIsLoading(false);
        return;
      }

      localStorage.setItem("user", JSON.stringify(userDataGet.data()));
      ToastAlert({
        type: "success",
        message: "User login successfully",
      });
      setIsLoading(false);
      navigate("/blog");
    } catch (error) {
      setIsLoading(false);
      ToastAlert({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Stack
        sx={{
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            width: { lg: "80%", md: "90%", sm: "100%", xs: "100%" },
            padding: "10px",
          }}
        >
          <Grid container spacing={3}>
            <Grid size={5} sx={{ display: "flex", alignItems: "center" }}>
              <Box component={"img"} src={Userlogin} sx={{ width: "100%" }} />
            </Grid>
            <Grid size={7}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  height: "100%",
                  flexDirection: "column",
                  padding: "30px",
                }}
              >
                <Typography
                  variant="h4"
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  Login Form
                </Typography>
                <TextField
                  label="Enter Email"
                  placeholder="Enter Email"
                  variant="outlined"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  label="Enter Password"
                  placeholder="Enter Password"
                  variant="outlined"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Typography variant="body2">
                  not have an account please? <Link to={"/signup"}>SignUp</Link>
                </Typography>
                <Button
                  onClick={loginHandler}
                  variant="contained"
                  sx={{ padding: "10px 0", display: "flex", gap: "10px" }}
                >
                  {isLoading && <CircularProgress color="white" size={20} />}
                  Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Login;
