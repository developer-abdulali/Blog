import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ArticleDetails } from "./pages/ArticleDetails/ArticleDetails";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route indexk path="/" element={<Home />} />
        <Route path="/blog/:id" element={<ArticleDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};
export default App;
