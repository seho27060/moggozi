import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const SearchLayout = () => {
  return (
    <div>
      <NavigationBar />
      SearchLayout
      <Outlet />
    </div>
  );
};

export default SearchLayout;
