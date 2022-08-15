import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const ChallengeLayout = () => {
  return (
    <div>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default ChallengeLayout;
