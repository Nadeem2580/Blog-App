// Modal.jsx
import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Fireabse";
import { useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  open,
  close,
  title,
  subject,
  content,
  ID,
  fetchData
}) {
  const [newtitle, setNewTitle] = useState("");
  const [newsubject, setNewSubject] = useState("");
  const [newcontent, setNewContent] = useState("");
  
    useEffect(() => {
    if (open) {
      setNewTitle(title);
      setNewSubject(subject);
      setNewContent(content);
    }
  }, [open, title, subject, content]);

  
  const saveHandler = async () => {
    const washingtonRef = doc(db, "Blogs", ID);

    // Set the "capital" field of the city 'DC'
    await updateDoc(washingtonRef, {
      blogTitle: newtitle,
      blogSubject: newsubject,
      blogContent: newcontent,
    });
    fetchData()
    close();
    console.log("save");
  };
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Typography variant="h5">Edit Blog</Typography>
          <TextField
            placeholder="Enter title"
            label={"Enter title"}
            fullWidth
            value={newtitle}
       onChange={(e) => {
              setNewTitle(e.target.value);
              
            }}
          />
          <TextField
            value={newsubject}
            placeholder="Enter Subject"
            label={"Enter Subject"}
            fullWidth
            onChange={(e) => {
       setNewSubject(e.target.value);
              
            }}
          />
          <TextField
            value={newcontent}
            placeholder="Enter Blog"
            label={"Enter Blog"}
            onChange={(e) => {
              setNewContent(e.target.value);
              
            }}
            multiline
            rows={5}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <Button variant="contained" onClick={close}>Cancel</Button>
            <Button variant="contained" onClick={saveHandler}>
              Save
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
