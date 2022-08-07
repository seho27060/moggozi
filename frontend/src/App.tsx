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
function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  useEffect(() => {
    if (sessionStorage.getItem("accessToken") != null) {
      persistAuth()
        .then((res) => {
          dispatch(authentication(res));
          profileImgFetchAPI(userId!).then((res) =>
            dispatch(userImgFetch(res))
          );
          // console.log(res)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, userId]);

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
