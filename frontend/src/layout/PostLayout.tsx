import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const PostLayout = () => {
  return <div>
    <NavigationBar />
    PostLayout
    < Outlet />
  </div>;
};

export default PostLayout;
