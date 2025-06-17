import React, { useEffect, useState } from "react";
import UserDashboard from "../UserDashboard/UserDashboard";
import Cards from "../../Component/Cards";
import { Grid, Stack, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Fireabse";
import { Link } from "react-router-dom";
import Navbar from "../../Component/Navbar";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    callData();
  }, []);
  const callData = async () => {
    const citiesRef = collection(db, "Blogs");
    const UID = JSON.parse(localStorage.getItem("user")).uid;
    // Create a query against the collection.
    const q = query(citiesRef, where("UId", "==", UID));
    console.log(q, "blogs");
    try {
      const querySnapshot = await getDocs(q);
      const queryBlogs = [];
      querySnapshot.forEach((doc) => {
        const docu = doc.data();
        queryBlogs.push({
          UId: docu.UId,
          content: docu.blogContent,
          image: docu.blogImage,
          subject: docu.blogSubject,
          title: docu.blogTitle,
          id: doc.id,
        });
        setBlogs(queryBlogs);
      });
    } catch (error) {
      console.error("Error fetching documents:", error);
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
              <Link key={blog.id} to={`/blog/${blog.id}`} style={{textDecoration:"none"}}>
                <Cards
                  title={blog.title}
                  subject={blog.subject}
                  content={blog.content}
                  image={blog.image}
                  id={blog.id}
                  UID={blog.UID}
                  
                />
              </Link>
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

export default AllBlogs;
