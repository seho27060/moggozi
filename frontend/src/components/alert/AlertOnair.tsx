import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AlertList from "./AlertList";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { setAlertList, setRealTimeAlert } from "../../store/alert";
import { alertReadall, alertRecent } from "../../lib/withTokenApi";
// import { WebSocketContext } from "../../lib/WebSocketProvider";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import {
  setPostUpdateFormState,
  setPostModalOpen,
  setAlertPostModalOpen,
} from "../../store/postModal";
import PostDetailItem from "../post/PostDetailItem";

import styles from "./AlertOnair.module.scss";
import PostModal from "../ui/PostModal";

const AlertOnair: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(false);
  // const user = useSelector((state: RootState) => state.auth.userInfo);
  const { alertPostModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );
  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
    dispatch(setPostUpdateFormState(false));
    dispatch(setAlertPostModalOpen(false));
  };
  const realTimeAlert = useSelector(
    (state: RootState) => state.alert.realTimeAlert
  );
  // const ws = useContext(WebSocketContext);

  const alertClickHandler = () => {
    console.log("alertclick", realTimeAlert);
    alertRecent()
      .then((res) => {
        console.log("recent alert read", res);
        dispatch(setAlertList(res));
      })
      .catch((err) => {
        console.log("err", err);
      });
    setIsToggle(!isToggle);
    dispatch(setRealTimeAlert(false));
    alertReadall();
  };
  return (
    <div
      className={styles.dropdown}
      style={{ background: "white", paddingTop: "0" }}
    >
      <button
        onClick={alertClickHandler}
        style={{ border: "none", fontSize: "1.4rem" }}
      >
        {realTimeAlert ? <VscBellDot className={styles.bell} /> : <VscBell />}
      </button>
      <div>{isToggle && <AlertList setIsToggle={setIsToggle} />}</div>
      <div>
        {alertPostModalOpen && (
          <PostModal open={alertPostModalOpen} close={closePostModal}>
            {!postUpdateFormOpen && <PostDetailItem />}
            {postUpdateFormOpen && <PostUpdateForm />}
          </PostModal>
        )}
      </div>
    </div>
  );
};

export default AlertOnair;
