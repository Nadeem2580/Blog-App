import Modal from "@mui/material/Modal";
const Api_Secret = `TnvXHWhhxJlZVCGWzyBZ_oRfpUQ`;
const cloudName = "dihxsnmam";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Fireabse";
import BasicModal from "./Modal";
import { useState } from "react";

const Cards = ({obj,  fetchData , actionBtn }) => {
  const [modal, setModel] = useState(false);
  const handleOpen = () => {
    setModel(true);
  };
  const handleClose = () => {
    setModel(false);
  };

  const editHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    handleOpen();
  };

  const deleteHandler = async (e) => {
    e.stopPropagation(); // prevents Link from triggering
    e.preventDefault(); // prevents Link navigation
    await deleteDoc(doc(db, "Blogs", obj.id));
    fetchData();
  };

  return (
    <Grid size={12}>
      <Link to={`/blog/${obj.id}`} style={{ textDecoration: "none" }}>
        <Card
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            borderRadius: 3,
            overflow: "hidden",
            height: { xs: "auto", sm: "300px" },
          }}
        >
          <CardMedia
            component="img"
            src={obj.blogImage}
            alt={obj.blogTitle}
            sx={{
              width: { xs: "100%", sm: "300px", md: "350px" },
              height: { xs: "200px", sm: "100%" },
              objectFit: "cover",
            }}
          />
          <CardContent
            sx={{
              flex: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box
                sx={{
                  marginBottom: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: "3px",
                  backgroundColor: "#1976d2",
                  padding: "0 10px",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  {obj.blogTitle}
                </Typography>

                {actionBtn && (
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    <EditNoteIcon onClick={editHandler} />
                    <DeleteSweepIcon color="error" onClick={deleteHandler} />
                  </Box>
                ) }
              </Box>

              <Typography variant="subtitle1" color="text.secondary">
                Subject: {obj.blogSubject}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                mt={1}
                sx={{
                  maxHeight: "100px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {obj.blogContent}
              </Typography>
            </Box>

            <Box mt={2} textAlign="right">
              <Typography variant="caption" color="text.secondary">
                Posted by{" "}
                <Typography component="span" fontWeight="bold">
                  {JSON.parse(
                    localStorage.getItem("user")
                  ).fullName.toUpperCase()}
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
      <BasicModal
        open={modal}
        close={handleClose}
        title={obj.blogTitle}
        subject={obj.blogSubject}
        content={obj.blogContent}
        ID={obj.id}
        fetchData={fetchData}
      />
    </Grid>
  );
};

export default Cards;
