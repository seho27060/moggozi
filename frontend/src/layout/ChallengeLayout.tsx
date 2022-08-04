import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const ChallengeLayout = () => {
  return (
    <div>
      <NavigationBar />
      ChallengeLayout
      <Outlet />
    </div>
  );
};

export default ChallengeLayout;
