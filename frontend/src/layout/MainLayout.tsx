import { Outlet } from "react-router-dom"
import NavigationBar from "./NavigationBar";

function MainLayout () {
  return <div>
    <NavigationBar />
    <p>MainLayout</p>
    <div>
    <Outlet />
      
    </div>
  </div>
}
export default MainLayout;