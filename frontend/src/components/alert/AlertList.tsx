import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertAll } from "../../lib/withTokenApi";
import { Alert, setAlertList } from "../../store/alert";
import { RootState } from "../../store/store";
import AlertItem from "./AlertItem";
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
      {/* <button onClick={() => {
        alertReadall().then((res)=>{
          console.log("readall",res)
          alertRecent().then((res) => {
            console.log("ll",res)
            dispatch(checkAlertList())
          })
        })
      }}>알림 전체 확인</button> */}
      <button onClick={alertAllHandler}>알림 기록 확인</button>
      {/* <div>
        dropDiwn
        <Dropdown dropdownItems = {loadedAlertList}/>
      </div> */}
    </div>
  );
};

export default AlertList;
