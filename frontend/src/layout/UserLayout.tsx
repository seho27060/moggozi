import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Footer from "../components/ui/Footer";
const UserLayout = () => {
  return (
    <div>
      <div style={{ minHeight: "100%", position: "relative"}}>
        <NavigationBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout;