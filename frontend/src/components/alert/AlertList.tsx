import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { alertRecent } from "../../lib/withTokenApi";
import { setAlertList } from "../../store/alert";
import { RootState } from "../../store/store";

function AlertList() {
  const dispatch = useDispatch()
  const loadedAlertList = useSelector((state:RootState)=> state.alert.alertList)

  alertRecent().then((res) =>{
    console.log("recent alert read",res)
    dispatch(setAlertList(res))
  }).catch((err) =>{
    console.log("err",err)
  })
  return(<div>

  </div>)
}

export default AlertList;
