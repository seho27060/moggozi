import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/auth"

const LogoutBtn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logout())
    // 임시로 메인페이지로 넘겨 준 후, 페이지 새로고침을 통해 
    // 리덕스에 있는 데이터를 날려주었음.
    // + store의 logout에서 axios를 통한 백엔드와의 통신 필요.
    navigate('/')
    window.location.reload();
    
  }

  return  <div>
    <button onClick={LogoutHandler}>Logout</button>
  </div>
}

export default LogoutBtn