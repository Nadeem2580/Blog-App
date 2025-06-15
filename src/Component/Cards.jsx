import React from "react";
const Api_Secret = `TnvXHWhhxJlZVCGWzyBZ_oRfpUQ`;
const cloudName = "dihxsnmam";
import { Box, Grid, Typography, Card, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";

const Cards = ({ title, subject, content, image, id }) => {
  return (
    <Grid size={12}>
      <Link to={`/blog/${id}`}>
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
        <hr />
        <CardMedia
          component="img"
          src={image}
          alt={title}
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
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Subject: {subject}
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
              {content}
            </Typography>
          </Box>

          <Box mt={2} textAlign="right">
            <Typography variant="caption" color="text.secondary">
              Posted by{" "}
              <Typography component="span" fontWeight="bold">
                { JSON.parse(localStorage.getItem("user")).fullName.toUpperCase()}
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>
              </Link>
    </Grid>
  );
};

export default Cards;

