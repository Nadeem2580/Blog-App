import { Box, Grid, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import Cards from "../../Component/Cards";
import { ToastAlert } from "../../Utils/Utility";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Fireabse";
import Navbar from "../../Component/Navbar";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        tempArr.push(obj);
      });
      setBlogs(tempArr);

    } catch (error) {
      ToastAlert({
        type: "error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Stack
        sx={{
          width: { xs: "100%", sm: "100%", md: "90%", lg: "80%" },
          margin: "30px auto",
        }}
      >
        <Grid container spacing={2}>
          {blogs.length > 0 ? (
            blogs.map((blog) =>
              !blog.status ? (
                
                <Cards key={blog.id}  obj={blog} fetchData={fetchData} />
              ) : null
            )
          ) : (
            <Typography variant="h5" color="error" sx={{ mx: "auto", mt: 4 }}>
              No blog posts available.
            </Typography>
          )}
        </Grid>
      </Stack>
    </>
  );
};

export default UserDashboard;
