import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AlertList from "./AlertList";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { Alert, setAlertList, setRealTimeAlert } from "../../store/alert";
import { alertReadall, alertRecent } from "../../lib/withTokenApi";
import { WebSocketContext } from "../../lib/WebSocketProvider";
import PostUpdateForm from "../../components/post/PostUpdateForm";
import {
  setPostUpdateFormState,
  setPostModalOpen,
} from "../../store/postModal";
import Modal from "../ui/Modal";
import PostDetailItem from "../post/PostDetailItem";
const AlertOnair: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [isToggle, setIsToggle] = useState(false);
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const { postModalOpen, postUpdateFormOpen } = useSelector(
    (state: RootState) => state.postModal
  );
  const closePostModal = () => {
    dispatch(setPostModalOpen(false));
    dispatch(setPostUpdateFormState(false));
  };
  const realTimeAlert = useSelector(
    (state: RootState) => state.alert.realTimeAlert
  );
  const ws = useContext(WebSocketContext);

  return (
    <div style={{ border: "solid 10px" }}>
      <button
        onClick={() => {
          let jsonSend: Alert = {
            check: 0,
            createdTime: "0",
            id: "0",
            index: "1",
            message: "message",
            receiverId: "11",
            receiverName: "start",
            senderId: user.id!.toString(),
            senderName: "anonymous",
            type: "comment",
          };
          ws.current.send(JSON.stringify(jsonSend));
        }}
      >
        to 11
      </button>
      <button
        onClick={() => {
          let jsonSend: Alert = {
            check: 0,
            createdTime: "0",
            id: "0",
            index: "1",
            message: "message",
            receiverId: "43",
            receiverName: "start",
            senderId: user.id!.toString(),
            senderName: "anonymous",
            type: "reply",
          };
          ws.current.send(JSON.stringify(jsonSend));
        }}
      >
        to 43
      </button>

      <button
        onClick={() => {
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
          alertReadall()
        }}
      >
        {realTimeAlert ? <VscBellDot /> : <VscBell />}
      </button>
      <div>{isToggle && <AlertList />}</div>

      <div>
        {postModalOpen && (
          <Modal
            open={postModalOpen}
            close={closePostModal}
            header="Modal heading"
          >
            {!postUpdateFormOpen && <PostDetailItem />}
            {postUpdateFormOpen && <PostUpdateForm />}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AlertOnair;
