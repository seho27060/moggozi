import { Outlet } from 'react-router-dom'

const AccountLayout: React.FC = () => {
  return (

    // 임시! 사용법만 적어둠.
    <div style={{background: 'url("https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FJSF5R%2FbtrJCobJJUP%2FnKGKPqMDjxEdIyvmnuwik1%2Fimg.png")', backgroundSize:"cover", position: 'relative',}}>
      <Outlet />
    </div>
  )
}

export default AccountLayout;