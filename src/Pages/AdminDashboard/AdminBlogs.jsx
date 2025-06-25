import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { db } from "../../Fireabse";
import Cards from "../../Component/Cards";
import { Box } from "@mui/material";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Blogs"));
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        const obj = { ...doc.data() };
        tempArr.push(obj);
      });
      setBlogs(tempArr);
    })();
  }, []);




  return(
<div>

{blogs.map((obj ,index)=>{
return(
  <Box sx={{marginBottom:"20px"}}>
    <Cards key={index} obj={obj} actionBtn={true} />
    
     </Box>
)
})}

</div>

  )
};

export default AdminBlogs;
