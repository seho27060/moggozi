import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { alertRead, postRead } from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";
import { PostData } from "../../store/post";
import {  setModalPostState, setPostModalOpen } from "../../store/postModal";

const AlertItem: React.FC<{ alertData: Alert }> = ({ alertData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const alertCheckHandler = () => {
    alertRead(Number(alertData!.id))
      .then((res) => {
        console.log("alert check", res);
      })
      .catch((err) => {
        console.log(err);
      });
    if (
      alertData.type === "post" ||
      alertData.type === "comment" ||
      alertData.type === "reply"
    ) {
      // 모달 띄우기
      postRead(Number(alertData!.index)).then((res:PostData) => {
        dispatch(setModalPostState(res));
        dispatch(setPostModalOpen(true));
      }).catch((err)=>{
        alert(err)
      })
      // dispatch(setPostModalStageId);
    } else if (alertData.type === "follow") {
      navigate(`/user/${alertData.senderId}`);
    } else if (alertData.type === "challenge") {
      navigate(`/challenge/${alertData.index}`);
    }
  };
  // type하고 index 이용해서 api요청후 이동할 라우터 정하기
  return (
    <div>
      <button onClick={alertCheckHandler}>
        {/* 확인한 알림/ 안한 알림에 따라 다르게 출력 */}
        {/* type 별로 라우터 다르게 navigate */}
        <div>{alertData.message}</div>
      </button>
    </div>
  );
};

export default AlertItem;
