// import type { RootState } from "./store/store";
import { useDispatch } from "react-redux";

import Router from "./routes";
import { authentication } from "./store/user";
import Api from "./lib/customApi"

import "./App.scss";

function App() {
  const dispatch = useDispatch();

  // const currentState = useSelector((state: RootState) => state);
  // const isLoggedIn = currentState.user.isLoggedIn

  const accessToken = localStorage.getItem("accessToken")
  const user_id = localStorage.getItem("user_id")

  if (accessToken) {
    const auth = async() => {
      try{
      const { data } = await Api.post(`/auth/refreshToken/${ user_id }`)
      return data
      }
      catch (err) {
        alert(err)
      } 
    }
    // 여기는 데이터가 어떻게 오는지 보고 수정해야 할 듯.
    if (auth) {
      dispatch(authentication(auth))
    } else {
      alert("다시 로그인해 주세요.")
    }
  }

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
