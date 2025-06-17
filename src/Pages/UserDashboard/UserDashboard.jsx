import { Box, Grid, Stack, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import Cards from "../../Component/Cards";
import { ToastAlert } from "../../Utils/Utility";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Fireabse";
import Navbar from "../../Component/Navbar";

const UserDashboard = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      const blogData = [];

      querySnapshot.forEach((doc) => {
        blogData.push({
          UID: doc.data().UId,
          id: doc.id,
          title: doc.data().blogTitle,
          subject: doc.data().blogSubject,
          content: doc.data().blogContent,
          image: doc.data().blogImage,
        });
      });

      {
        console.log(blogs, "Blogs");
      }
      setBlogs(blogData);
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
            blogs.map((blog) => (
              <Cards
                key={blog.id}
                title={blog.title}
                subject={blog.subject}
                content={blog.content}
                image={blog.image}
                id={blog.id}
                UID={blog.UID}
                fetchData={fetchData}
              />
            ))
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
