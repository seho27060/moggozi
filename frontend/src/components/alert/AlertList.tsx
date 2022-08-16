import { Dispatch, MouseEvent, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertAll } from "../../lib/withTokenApi";
import { Alert, setAlertList } from "../../store/alert";
import { RootState } from "../../store/store";
import AlertItem from "./AlertItem";

import styles from "./AlertOnair.module.scss";
import classes from "./AlertList.module.scss"
const AlertList: React.FC<{
  setIsToggle: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsToggle }) => {
  const dispatch = useDispatch();
  const loadedAlertList = useSelector(
    (state: RootState) => state.alert.alertList
  );

  const alertAllHandler = (event: MouseEvent) => {
    event.preventDefault();
    alertAll().then((res) => {
      dispatch(setAlertList(res));
    });
  };
  console.log("loadAlertlist", loadedAlertList);

  return (
    <div className={styles.dropdownContent} style={{maxHeight:"20rem"}}>
      <>
        {loadedAlertList &&
          loadedAlertList.map((alert: Alert) => (
            <div key={alert.id}>
              <AlertItem alertData={alert} />
              <div className={classes.horizon}></div>
            </div>
          ))}
        {}
      </>
      {/* <button onClick={() => {
        alertReadall().then((res)=>{
          console.log("readall",res)
          alertRecent().then((res) => {
            console.log("ll",res)
            dispatch(checkAlertList())
          })
        })
      }}>알림 전체 확인</button> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={alertAllHandler}
          style={{ margin: "3px 15px", padding: "5px 0px 10px 5px",fontSize:"1rem", fontWeight:"600", cursor: "pointer"}}
        >
          전체확인
        </button>
        <button
          onClick={() => setIsToggle(false)}
          style={{ margin: "3px 15px", padding: "5px 5px 10px 5px",fontSize:"1rem", fontWeight:"600", cursor: "pointer" }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default AlertList;
