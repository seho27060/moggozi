import { Outlet } from "react-router-dom";
import Footer from "../components/ui/Footer";
import NavigationBar from "./NavigationBar";

const ChallengeLayout = () => {
  return (
    <div style={{ minHeight: "100%", position: "relative"}}>
      <NavigationBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default ChallengeLayout;
