import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Fab,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToastAlert } from "../../Utils/Utility";
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Fireabse";
import Navbar from "../../Component/Navbar";
const Secret_Key = `TnvXHWhhxJlZVCGWzyBZ_oRfpUQ`;
const CLOUD_NAME = `dihxsnmam`;

const CreateBlog = () => {
  const inputRef = useRef();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [blog, setBlog] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [blogImage, setBlogImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const imageHandler = () => {
    inputRef.current.click();
  };

  const blogHandler = async () => {
    if ((!title, !subject, !blog)) {
      ToastAlert({
        type: "error",
        message: "All fields and mendatory",
      });
      return;
    }

    if (!blogImage) {
      ToastAlert({
        type: "error",
        message: "Image required",
      });
      return;
    } else {
      try {

        setIsLoading(true);
        let url;
        const formData = new FormData();
        formData.append("file", blogImage);
        formData.append("upload_preset", "myBlog");

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          formData
        );
        url = response.data.secure_url;
        const dataObj = {
          blogTitle: title,
          blogSubject: subject,
          blogContent: blog,
          status: isPrivate,
          blogImage: url,
          UId: JSON.parse(localStorage.getItem("user")).uid
        };
        const docRef = await addDoc(collection(db, "Blogs"), dataObj);
        console.log(docRef, "docRef");
        ToastAlert({
          type: "success",
          message: "image uploaded",
        });

        setBlog("");
        setBlogImage("");
        setIsPrivate("");
        setSubject("");
        setTitle("");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        ToastAlert({
          type: "error",
          message: error.message,
        });
      }
    }
  };

  return (
    <>
    <Navbar />
      <Stack
        sx={{
          width: { xs: "100%", sm: "90%", md: "80%", lg: "70%", xl: "50%" },
          margin: "50px auto ",
          padding: { xs: "10px", sm: "0" },
        }}
      >
        <Stack direction={"column"} gap={4}>
          <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
            Create Blog
          </Typography>
          <TextField
            placeholder="Enter Title"
            label="Enter Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <TextField
            placeholder="Enter Subject"
            label="Enter Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          <TextField
            placeholder="write your blog"
            label="write your blog"
            multiline
            rows={6}
            value={blog}
            onChange={(e) => {
              setBlog(e.target.value);
            }}
          />
          <Stack direction={"rows"}>
            <FormControlLabel
              control={<Checkbox />}
              onChange={(e) => {
                setIsPrivate(e.target.checked);
              }}
              label="Private"
            />
            <FormControlLabel
              control={
                <Fab
                  size="small"
                  color="primary"
                  aria-label="add"
                  sx={{ margin: "0 10px 0" }}
                >
                  <AddIcon />
                </Fab>
              }
              onClick={imageHandler}
              label="Upload file"
            />
          </Stack>
          <input
            type="file"
            hidden
            ref={inputRef}
            onChange={(e) => {
              setBlogImage(e.target.files[0]);
            }}
          />
          <Button
            onClick={blogHandler}
            variant="contained"
            sx={{ padding: "10px 0", display: "flex", gap: "10px" }}
          >
            {isLoading && <CircularProgress color="white" size={20} />}
            Blog Create
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default CreateBlog;
