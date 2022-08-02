import type { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../lib/withTokenApi";
import { logout } from "../../store/auth";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIdState = useSelector(
    (state: RootState) => state.auth.userInfo.id
  );

  const LogoutHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    const option = {
      id: userIdState
    }
    console.log(option)
    logoutApi(option)
      .then((res) => {
        console.log(res);
        dispatch(logout());
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("잘못된 요청입니다.")
      });
  };

  return (
    <div>
      <button onClick={LogoutHandler}>Logout</button>
    </div>
  );
};

export default LogoutBtn;
