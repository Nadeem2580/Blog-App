import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SignUpImage from "../../assets/signup.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastAlert } from "../../Utils/Utility";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Fireabse";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const signUpHandler = async (e) => {
    e.preventDefault()
    if (!fullName || !email || !password || !confirmPass) {
      ToastAlert({
        type: "error",
        message: "All fields are mendatory",
      });
      return;
    }

    if (fullName.length < 2) {
      ToastAlert({
        type: "error",
        message: "Enter Correct name",
      });
      return;
    }

    if (email.length < 2) {
      ToastAlert({
        type: "error",
        message: "Enter Correct name",
      });
      return;
    }

    if (password.length < 6) {
      ToastAlert({
        type: "error",
        message: "Enter character more than 6",
      });
      return;
    }
    if (password !== confirmPass) {
      ToastAlert({
        type: "error",
        message: "password does not match",
      });
      return;
    }

    try {
      setIsloading(true);
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = response.user.uid;

      const dataSendToFirebase = await setDoc(doc(db, "users", uid), {
        fullName,
        email,
        type: "user",
        isLogin: true,
        uid,
      });
      ToastAlert({
        type: "success",
        message: "User created Successfully",
      });
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPass("");
      setIsloading(false);
      navigate("/");
    } catch (error) {
      setIsloading(false);
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
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { lg: "80%", md: "90%", sm: "100%", xs: "100%" },
            margin: "0 auto",
          }}
        >
          <Grid container spacing={3}>
            <Grid size={5}>
              <Box component={"img"} src={SignUpImage} sx={{ width: "100%" }} />
            </Grid>
            <Grid size={7}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  gap: "20px",
                  flexDirection: "column",
                  padding: { sm: "5px", md: "20px", lg: "30px" },
                }}
                >
                <form onSubmit={signUpHandler}>
                <Box sx={{display:"flex",flexDirection:"column",gap:"20px"}}>

                <Typography
                  variant="h4"
                  textAlign={"center"}
                  fontWeight={"bold"}
                  >
                  Sign-Up Form
                </Typography>
                <TextField
                  label="Enter Full Name"
                  placeholder="Enter Full Name"
                  variant="outlined"
                  {...register("email" , {required :true})}
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  />
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
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <TextField
                  label="Enter Confirm Password"
                  placeholder="Enter Confirm Password"
                  variant="outlined"
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                />
                <Typography variant="body2">
                  Already have an account please? <Link to={"/"}>Login</Link>
                </Typography>
                <Button
                type="submit"
                  variant="contained"
                  sx={{ padding: "10px 0" }}
                  onClick={signUpHandler}
                >
                  {isloading && <CircularProgress color="white" size={20} />}
                  Sign Up
                </Button>

                </Box>
                  </form>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </>
  );
};

export default Signup;
