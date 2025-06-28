import { useEffect, useState } from "react";
import UserDashboard from "../UserDashboard/UserDashboard";
import Cards from "../../Component/Cards";
import { Grid, Stack, Typography } from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Fireabse";
import { Link } from "react-router-dom";
import Navbar from "../../Component/Navbar";

const AllBlogs = () => {
const [refresh, setRefresh] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const UID = JSON.parse(localStorage.getItem("user")).uid;
  useEffect(() => {
    callData();
  }, [refresh]);
  const callData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      const tempArr = [];
      querySnapshot.forEach((doc) => {
       if(doc.data().UId ==UID ){

         const obj = { ...doc.data(), id: doc.id };
         tempArr.push(obj);
       }
       
      });

      setBlogs(tempArr);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

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
            blogs.map(
              (blog) =>
                (blog.UId = UID && (
                  <Cards
                    key={blog.id}
                    obj={blog}
                    actionBtn={true}
                    setRefresh={setRefresh}
                  />
                ))
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

export default AllBlogs;
