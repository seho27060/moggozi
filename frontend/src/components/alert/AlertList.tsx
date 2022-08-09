import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertReadall, alertRecent } from "../../lib/withTokenApi";
import { Alert, setAlertList } from "../../store/alert";
import { RootState } from "../../store/store";
import AlertItem from "./AlertItem";
const AlertList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const loadedAlertList = useSelector(
    (state: RootState) => state.alert.alertList
  );
  console.log("loadAlertlist", loadedAlertList);

  return (
    <div>
      AlertList
      <>
        {loadedAlertList &&
          loadedAlertList.map((alert: Alert) => (
            <div key={alert.id}>
              <AlertItem alert={alert} />
            </div>
          ))}
        {}
      </>
      <button onClick={() => {
        alertReadall().then((res)=>{
          console.log("readall",res)
          alertRecent().then((res) => {
            setAlertList([...res])
          })
        })
      }}>알림 전체 확인</button>
      <button>알림 기록 확인</button>
    </div>
  );
};

export default AlertList;
