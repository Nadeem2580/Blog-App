import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../Fireabse";
import Cards from "../../Component/Cards";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        const obj = { ...doc.data(), id: doc.id };
        tempArr.push(obj);
      });
      setBlogs(tempArr);
    })();
  }, []);

  return (
    <>
      <Stack
        sx={{
          width: { xs: "100%", sm: "100%", md: "90%", lg: "80%" },
          margin: "30px auto",
        }}
      >
        <Grid container spacing={2}>
          {blogs.length > 0 ? (
            blogs.map((blog) =>
               (
                <Link
                key={blog.id}
                  to={`/adminDashboard/blog/${blog.id}`}
                  style={{ textDecoration: "none", width:"100%" }}
                >
                  <Cards  obj={blog} setRefresh={setRefresh} actionBtn={true} />
                </Link>
              ) 
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

export default AdminBlogs;
