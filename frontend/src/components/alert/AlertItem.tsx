import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { alertRead, postRead } from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";
import { PostData } from "../../store/post";
import {  setAlertModalPostState, setAlertPostModalOpen, setModalPostState, setPostModalOpen } from "../../store/postModal";
import styles from "./AlertOnair.module.scss"
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
        dispatch(setPostModalOpen(false));
        dispatch(setAlertPostModalOpen(true));
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

  function timeForToday(value:Date) {
    const today = new Date();
    const timeValue = new Date(value);

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
    if (betweenTime < 1) return '방금전';
    if (betweenTime < 60) {
        return `${betweenTime}분전`;
    }

    const betweenTimeHour = Math.floor(betweenTime / 60);
    if (betweenTimeHour < 24) {
        return `${betweenTimeHour}시간전`;
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }

    return `${Math.floor(betweenTimeDay / 365)}년전`;
}
  // type하고 index 이용해서 api요청후 이동할 라우터 정하기
  return (
    <div  >
      <button onClick={alertCheckHandler} style={{background:"white",margin:"0.5rem 0",fontSize:"0.7rem", padding:"1rem 0.7rem 0rem 1.7rem"}}>
        {/* 확인한 알림/ 안한 알림에 따라 다르게 출력 */}
        {/* type 별로 라우터 다르게 navigate */}
        <div style={{whiteSpace: "pre-line"}}>{alertData.message}</div>
        <div>{timeForToday(new Date(alertData.createdTime!))}</div>
      </button>
    </div>
  );
};

export default AlertItem;
