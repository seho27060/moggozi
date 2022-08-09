import { alertRead } from "../../lib/withTokenApi";
import { Alert } from "../../store/alert";

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => {
  const alertCheckHandler = () => {
    alertRead(Number(alert!.id))
      .then((res) => {
        console.log("alert check", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <button>
        {/* 확인한 알림/ 안한 알림에 따라 다르게 출력 */}
        {/* type 별로 라우터 다르게 navigate */}
        <div onClick={() => alertCheckHandler}>{alert.message}</div>
      </button>
    </div>
  );
};

export default AlertItem;
