import { Outlet } from 'react-router-dom'


const AccountLayout = (props) => {
  console.log(props)
  return (
    <div>
      AccountLayout
      {props.children}
      <Outlet />
    </div>
  )
}

export default AccountLayout;