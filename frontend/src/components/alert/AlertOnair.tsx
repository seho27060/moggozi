import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const AlertOnair:React.FC<{}> = () => {
  const checkConnecting = useSelector((state: RootState) => state.alert.alert);
  return(<div style={{border:"solid 5px", justifyContent:"center"}}>
      {checkConnecting ? "Open": "Close"}
  </div>)
}

export default AlertOnair