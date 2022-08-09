import { useState } from "react";
import { Link } from "react-router-dom";
import { alertRead } from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const [Check, setCheck] = useState(Number(alert.check));
  let toRouteUrl = "/"
  
  const alertCheckHandler = () => {
    setCheck(1);
    alertRead(Number(alert!.id))
      .then((res) => {
        console.log("alert check", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // type하고 index 이용해서 api요청후 이동할 라우터 정하기
  if (alert.type === "comment" || alert.type === "reply") {
    toRouteUrl = ""
  } else if (alert.type === "follow") {
    toRouteUrl = ""
  } else if (alert.type === "challenge") {
    toRouteUrl = ""
  } else if ( alert.type === "post") {
    toRouteUrl = ""
  }
  return (
    <div>
      <button onClick={alertCheckHandler}>
        {/* 확인한 알림/ 안한 알림에 따라 다르게 출력 */}
        {/* type 별로 라우터 다르게 navigate */}
        <div style={Check ? { color: "red" } : { color: "blue" }}>
          {alert.message}
          <Link to={toRouteUrl}></Link>
        </div>
      </button>
    </div>
  );
};

export default AlertItem;
