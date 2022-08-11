import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertAll } from "../../lib/withTokenApi";
import { Alert, setAlertList } from "../../store/alert";
import { RootState } from "../../store/store";
import AlertItem from "./AlertItem";

import styles from "./AlertOnair.module.scss";

const AlertList: React.FC<{}> = () => {
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
    <div>
      <div className={styles.dropdownContent}>
        {loadedAlertList &&
          loadedAlertList.map((alert: Alert) => (
            <div key={alert.id}>
              <AlertItem alertData={alert} />
            </div>
          ))}
        {}
        <button onClick={alertAllHandler}>알림 기록 확인</button>
      </div>
      {/* <button onClick={() => {
        alertReadall().then((res)=>{
          console.log("readall",res)
          alertRecent().then((res) => {
            console.log("ll",res)
            dispatch(checkAlertList())
          })
        })
      }}>알림 전체 확인</button> */}
    </div>
  );
};

export default AlertList;
