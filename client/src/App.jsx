import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import { ArticleDetails } from "./pages/ArticleDetails/ArticleDetails";

const App = () => {
  return (
    <Routes>
      <Route indexk path="/" element={<Home />} />
      <Route path="/blog/:id" element={<ArticleDetails />} />
    </Routes>
  );
};
export default App;
