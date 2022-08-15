import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

const ChallengeLayout = () => {
  return (
    <div>
      <NavigationBar />
      배경 들어갈 곳.
      challenge Layout
      <Outlet />
    </div>
  );
};

export default ChallengeLayout;
