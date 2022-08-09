import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CloseEvent } from "sockjs-client";
import { Alert, AlertSend, setRealTimeAlert } from "../store/alert";
import { RootState } from "../store/store";
import { setWsConnect } from "../store/alert";
import { VscBell, VscBellDot } from "react-icons/vsc";

const WebsocketConnect = () => {
  console.log("rendering : WsSocket");

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  // const isConnecting = useSelector((state:RootState) => state.alert.isConnecting)

  var wsocket: WebSocket | null = null;

  let jsonSend: Alert = {
    check : "0",
    createdTime : "0",
    id : "0",
    index: "1",
    message: "message",
    receiverId: "0",
    receiverName: "start",
    senderId: "0",
    senderName: "anonymous",
    type: "register",
  };
  console.log(auth.userInfo.id, wsocket);
  if (auth.userInfo.id && !wsocket) {
    wsocket = new WebSocket("wss://i7c201.p.ssafy.io:443/api/ws/notification");
    console.log("login check", auth.userInfo.id);
    // 오픈
    wsocket.onopen = function onOpen(evt: any) {
      if (auth.userInfo.id && wsocket) {
        jsonSend.senderId = auth.userInfo.id!.toString();
        jsonSend.senderName = auth.userInfo.nickname!.toString();
        console.log("open user", jsonSend, "open", evt);
        wsocket!.send(JSON.stringify(jsonSend));
        dispatch(setWsConnect(jsonSend));
        setInterval(() => {
          // const time = new Date()
          // console.log(`30 sec,now: ${time}`, isConnecting);
          const connetSend: AlertSend = {
            index: "1",
            receiverId: "1",
            senderId: auth.userInfo.id!.toString(),
            type: "connection",
            msg: "1"
          };
          wsocket!.send(JSON.stringify(connetSend));
          // console.log("persisting connection", isConnecting, connetSend);
        }, 30000);
      }
    };
    // 클로즈
    wsocket.onclose = (evt: CloseEvent) => {
      if (auth.isLoggedIn) {
        console.log("Disconnected, 3초뒤 재연결", evt);
        wsocket = null;
        setTimeout(
          () =>
            (wsocket = new WebSocket(
              "wss://i7c201.p.ssafy.io:443/api/ws/notification"
            )),
          300
        );
      } else {
        console.log("Unconnected,", evt);
      }
    };  
    // 메세지 수령
    wsocket.onmessage = (evt: any) => {
      const message = JSON.stringify(evt.data.toString())
      console.log(`${auth.userInfo}, you have message ${message}`);
      dispatch(setRealTimeAlert(true))
    };
    // 에러
    wsocket.onerror = (evt: any) => {
      alert(evt);
    };
  } else {
    console.log("you nedd to login, go back to main", "user:", auth.userInfo);
  }

  return (
    <div>
      <button
        onClick={() => {
          console.log("!");
          const connetSend: Alert = {
            check : "0",
            createdTime : "0",
            id : "0",
            index: "1",
            message: "connect",
            receiverId: "43",
            receiverName: "name",
            senderId: auth.userInfo.id!.toString(),
            senderName: auth.userInfo.nickname!.toString(),
            type: "challenge",
          };
          wsocket!.send(JSON.stringify(connetSend));
        }}
      >
        <VscBell />
      </button>
      <button>
        <VscBellDot />
      </button>
    </div>
  );
};

export default WebsocketConnect;
