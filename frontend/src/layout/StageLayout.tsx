import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const StageLayout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default StageLayout;
