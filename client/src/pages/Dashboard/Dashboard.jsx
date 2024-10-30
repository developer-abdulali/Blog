import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../../components/DashSidebar/DashSidebar";
import DashProfile from "../../components/DashProfile/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <section className="min-h-screen flex flex-col md:flex-row">
      {/* sidebar */}
      {/* <div className="md:w-56"> */}
      <div>
        <DashSidebar />
      </div>

      {/* content */}
      {tab === "profile" && <DashProfile />}
    </section>
  );
};
export default Dashboard;
