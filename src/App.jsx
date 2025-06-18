import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Navbar from "./Component/Navbar";
import AllBlogs from "./Pages/Blogs/AllBlogs";
import CreateBlog from "./Pages/Blogs/CreateBlog";
import { Bounce, ToastContainer } from "react-toastify";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import NotFound from "./Pages/Notfound";
import SingleBlog from "./Pages/SingleBlog";
function App() {
  const [user, setUser] = useState(null);
  
  
  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   setUser(user);
  // },
  //  []);
  
  return (
    <>
    {/* {user ? <Navbar /> : null} */}
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/allblog" element={<AllBlogs />} />
        <Route path="/createblog" element={<CreateBlog />} />
        <Route path="/blog" element={<UserDashboard />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="*" element={<NotFound/>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
