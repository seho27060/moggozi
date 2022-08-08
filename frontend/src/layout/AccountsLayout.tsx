import { Outlet } from 'react-router-dom'

const AccountLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AccountLayout;