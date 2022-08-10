// import type { RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Router from "./routes";
import { authentication, userImgFetch } from "./store/auth";
import { persistAuth } from "./lib/withTokenApi";
import "./App.scss";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { profileImgFetchAPI } from "./lib/imgApi";
import WebSocketProvider from "./lib/WebSocketProvider";
function App() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") != null) {
      persistAuth()
        .then((res) => {
          dispatch(authentication(res));
          profileImgFetchAPI(user.id!).then((res) =>
            dispatch(userImgFetch(res))
          );
          // console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, user.id]);

  return (
    <div>
      <WebSocketProvider>
        <Router />
      </WebSocketProvider>
    </div>
  );
}

export default App;
