import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const UserLayout = () => {
  return (
    <div>
      <NavigationBar />
      UserLayout
      <Outlet />
    </div>
  )
}

export default UserLayout;