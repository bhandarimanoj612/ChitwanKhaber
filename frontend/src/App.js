import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Content from "./pages/Article-page/Content";
import ScrollToTopButton from "./components/ScrollToTopButton";
import CategoryJoin from "./pages/Category-page/CategoryJoin";
import UserProfileAdmin from "./pages/Admin-Dashboard/UserProfileAdmin";
import DashComment from "./pages/Admin-Dashboard/DashComment";
import Setting from "./pages/Admin-Dashboard/setting/Setting";
import LoginForm from "./pages/Login/LoginForm";
import UserPage from "./pages/Admin-Dashboard/Add-user/UserPage";
import CreatePost from "./pages/Dashboard/createPostPage/CreatePost";
import Posts from "./pages/Admin-Dashboard/Post";
import Post from "./pages/Dashboard/Post";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";
import Logout from "./pages/Admin-Dashboard/Logout";
import LogOut from "./pages/Dashboard/Logout";
import Profile from "./pages/Dashboard/Profile";
import EditPost from "./pages/Dashboard/editPostPage/EditPost";
import OtherUserProfile from "./pages/Admin-Dashboard/Add-user/OtherUserProfile";
import Ads from "./pages/Admin-Dashboard/Ads";
// import GoogleTranslate from "./GoogleTranslate";

function App() {
  const isLoggedIn = useSelector((state) => state.authenticate.isLoggedIn);
  const role = useSelector((state) => state.authenticate.role.payload);

  console.log(isLoggedIn);
  console.log(role);

  return (
    <>
      <div id="google_translate_element"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/article/:title" element={<Content />} exact />
          <Route path="/category/:cat" element={<CategoryJoin />} exact />

          {/* Editor Routes */}
          {isLoggedIn && role === "editor" && (
            <>
              <Route path="/dashboard/Posts" element={<Post />} exact />
              <Route path="/dashboard/Profile" element={<Profile />} exact />
              <Route
                path="/dashboard/create-post"
                element={<CreatePost />}
                exact
              />
              <Route
                path="/dashboard/edit-post/:id"
                element={<EditPost />}
                exact
              />
              <Route path="/dashboard/LogOut" element={<LogOut />} exact />
            </>
          )}

          {/* Admin Routes */}
          {isLoggedIn && role === "admin" && (
            <>
              <Route
                path="/cms-admin/Profile"
                element={<UserProfileAdmin />}
                exact
              />
              <Route
                path="/cms-admin/Comments"
                element={<DashComment />}
                exact
              />
              <Route path="/cms-admin/Settings" element={<Setting />} exact />
              <Route path="/cms-admin/Users" element={<UserPage />} exact />
              <Route path="/cms-admin/Posts" element={<Posts />} exact />
              <Route path="/cms-admin/LogOut" element={<Logout />} exact />
              <Route path="/cms-admin/ads" element={<Ads />} exact />
              <Route
                path="/cms-admin/user/:id"
                element={<OtherUserProfile />}
                exact
              />
            </>
          )}
          <Route path="/cms-admin" element={<LoginForm />} exact />
          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <GoogleTranslate /> */}
        <ScrollToTopButton />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </BrowserRouter>
    </>
  );
}

export default App;
