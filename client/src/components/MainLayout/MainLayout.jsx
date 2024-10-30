import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
export default MainLayout;
