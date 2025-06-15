import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  Container,
  Divider,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Fireabse";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "Blogs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          setError("Blog not found.");
        }
      } catch (err) {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card elevation={3} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <CardMedia
          component="img"
          height="400"
          image={blog.blogImage}
          alt={blog.blogTitle}
          sx={{ objectFit: "cover" }}
        />
        <Box p={3}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {blog.blogTitle}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Subject: {blog.blogSubject}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            {blog.blogContent}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="caption" display="block" textAlign="right">
            Posted by <strong>{JSON.parse(localStorage.getItem("user")).fullName.toUpperCase()}</strong>
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default SingleBlog;
