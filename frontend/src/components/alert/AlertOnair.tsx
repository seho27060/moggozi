import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AlertList from "./AlertList";
import { VscBell,VscBellDot } from 'react-icons/vsc'

const AlertOnair: React.FC<{}> = () => {
  const [isToggle, setIsToggle] = useState(false)

  const checkConnecting = useSelector((state: RootState) => state.alert.alert);
  return (
    <div style={{ border: "solid 5px", justifyContent: "center" }}>
      {checkConnecting ? "Open" : "Close"}
      <button onClick={() => {setIsToggle(!isToggle)}}><VscBellDot/></button>
      {isToggle && <AlertList/>}
    </div>
    
  );
};

export default AlertOnair;
