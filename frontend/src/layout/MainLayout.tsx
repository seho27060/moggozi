import { Outlet } from "react-router-dom"

function MainLayout () {
  return <div>
    <p>MainLayout</p>
    <Outlet />
  </div>
}
export default MainLayout;