// import type { RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Router from "./routes";
import { authentication } from "./store/auth";
import { persistAuth } from "./lib/withTokenApi";
import styles from "./App.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import WebSocketProvider from "./lib/WebSocketProvider";

import backgroundImg from "./asset/mainbackground.png";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.userInfo);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") != null) {
      persistAuth()
        .then((res) => {
          dispatch(authentication(res));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, user.id]);

  // style={{backgroundImage: `url(${backgroundImg})`, backgroundSize: "100%"}}
  return (
    <div style={{height: "100%", backgroundImage: `url(${backgroundImg})`, backgroundSize: "100%"}} >
      <WebSocketProvider>
        <div className={styles.mobile}></div>
        <Router />
      </WebSocketProvider>
    </div>
  );
}

export default App;
