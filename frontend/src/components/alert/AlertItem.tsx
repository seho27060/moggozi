import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { alertRead } from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";
import {  setPostModalState } from "../../store/postModal";

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const alertCheckHandler = () => {
    alertRead(Number(alert!.id))
      .then((res) => {
        console.log("alert check", res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (
      alert.type === "post" ||
      alert.type === "comment" ||
      alert.type === "reply"
    ) {
      // 모달 띄우기
      // dispatch(setModalPostState(post));
      dispatch(setPostModalState(true));
      // dispatch(setPostModalStageId);
    } else if (alert.type === "follow") {
      navigate(`/user/${alert.senderId}`);
    } else if (alert.type === "challenge") {
      navigate(`/challenge/${alert.index}`);
    }
  };
  // type하고 index 이용해서 api요청후 이동할 라우터 정하기
  return (
    <div>
      <button onClick={alertCheckHandler}>
        {/* 확인한 알림/ 안한 알림에 따라 다르게 출력 */}
        {/* type 별로 라우터 다르게 navigate */}
        <div>{alert.message}</div>
      </button>
    </div>
  );
};

export default AlertItem;
