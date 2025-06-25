import {
  Box,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { use, useEffect, useState } from "react";
import { auth, db } from "../../Fireabse";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
const AdminDashboard = () => {
  const [user, setUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const tempArr = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().type === "user") {
          const data = { ...doc.data() };
          tempArr.push(data);
        }
      });
      setUser(tempArr);
    })();
  }, [refresh]);

  const updateStatus = async (uid, event) => {
    const washingtonRef = doc(db, "users", uid);
    await updateDoc(washingtonRef, {
      isLogin: event.target.checked,
    });
    setRefresh(!refresh);
  };

  return (
    <Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>IsActive</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((user, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.email}
                </TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{String(user.isLogin)}</TableCell>
                <TableCell>
                  {
                    <Switch
                      onChange={(event) => updateStatus(user.uid, event)}
                      defaultChecked={user.isLogin}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;
