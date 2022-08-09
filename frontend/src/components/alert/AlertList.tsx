import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertRecent } from "../../lib/withTokenApi";
import { setAlertList } from "../../store/alert";
import { RootState } from "../../store/store";
import AlertItem from "./AlertItem";
const AlertList: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const loadedAlertList = useSelector(
    (state: RootState) => state.alert.alertList
  );
  console.log(loadedAlertList)
  // useEffect(() => {
  //   alertRecent()
  //     .then((res) => {
  //       console.log("recent alert read", res);
  //       dispatch(setAlertList(res));
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // }, []);

  return (
    <div>
      AlertList
      <>
        {loadedAlertList.map((alert) => {
          <div key={alert.id}>
            <AlertItem alert={alert} />;
          </div>;
        })}
      </>
      <button>알림 전체 확인</button>
      <button>알림 기록 확인</button>
    </div>
  );
};

export default AlertList;
