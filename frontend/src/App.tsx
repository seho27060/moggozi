// import type { RootState } from "./store/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Router from "./routes";
import { authentication } from "./store/user";
import { persistAuth } from "./lib/withTokenApi";

import "./App.scss";

function App() {
  const dispatch = useDispatch();
  // const currentState = useSelector((state: RootState) => state)

  useEffect(() => {
    persistAuth()
      .then((res) => {
        dispatch(authentication(res));
        // console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  return (
    <div>
      <Router />
    </div>
  );
}

export default App;
