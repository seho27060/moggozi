import { FormEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { CloseEvent } from "sockjs-client";
import AlertOnair from "../components/alert/AlertOnair";
import { Alert } from "../store/alert";
import { RootState } from "../store/store";

const WebsocketPage = () => {
  console.log("rendering");

  const user = useSelector((state: RootState) => state.auth.userInfo);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  let isConnecting: boolean = false;

  const messageRef = useRef<HTMLInputElement>(null);
  const receiverIdRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const senderIdRef = useRef<HTMLInputElement>(null);
  const senderNameRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef<HTMLInputElement>(null);
  const receiverNameRef = useRef<HTMLInputElement>(null);

  var wsocket: WebSocket | null = null;
  wsocket = new WebSocket("wss://i7c201.p.ssafy.io:443/api/ws/notification");

  let jsonSend: Alert = {
    index: "1",
    message: "message",
    receiverId: "1",
    receiverName: "start",
    senderId: "36",
    senderName: "seh",
    type: "register",
  };
  if (!isConnecting && user.id) {
    wsocket = new WebSocket("wss://i7c201.p.ssafy.io:443/api/ws/notification");
  }
  console.log("login check", isLoggedIn, user, isConnecting);
  wsocket!.onopen = function onOpen(evt: any) {
    if (isLoggedIn && user.id) {
      jsonSend.senderId = user.id!.toString();
      jsonSend.senderName = user.nickname!.toString();
      console.log("open user", jsonSend, "open", evt);
      wsocket!.send(JSON.stringify(jsonSend));
      isConnecting = true;
    }
    if (isConnecting) {
      setInterval(() => {
        const time = new Date()
        // console.log(`30 sec,now: ${time}`, isConnecting);
        const connetSend: Alert = {
          index: "1",
          message: "connect",
          receiverId: "1",
          receiverName: "name",
          senderId: user.id!.toString(),
          senderName: user.nickname!.toString(),
          type: "connection",
        };
        wsocket!.send(JSON.stringify(connetSend));
        // console.log("persisting connection", isConnecting, connetSend);
      }, 30000);
    }
  };
  wsocket!.onclose = (evt: CloseEvent) => {
    console.log("disconnected, 3초뒤 재연결", evt);
    wsocket = null;
    setTimeout(
      () =>
        (wsocket = new WebSocket(
          "wss://i7c201.p.ssafy.io:443/api/ws/notification"
        )),
      300
    );
  };
  function onSend(data: Alert, wsocket: WebSocket | null) {
    //senderId,senderName, receiverId, receiverName, type, index
    wsocket!.send(JSON.stringify(data))
    console.log("send to", receiverIdRef.current?.value, "json :", jsonSend);
    messageRef.current!.value = "";
  }
  const messageSendHandler = (event: FormEvent) => {
    event.preventDefault();
    jsonSend.message = messageRef.current!.value;
    jsonSend.senderId = senderIdRef.current!.value;
    jsonSend.index = senderIdRef.current!.value;
    jsonSend.type = typeRef.current!.value;
    jsonSend.receiverId = receiverIdRef.current!.value;
    jsonSend.receiverName = receiverNameRef.current!.value;
    jsonSend.senderName = senderIdRef.current!.value;
    onSend(jsonSend, wsocket);
  };

  return (
    <div>
      <h1>WebSocket TEST</h1>
      <form>
        <div>
          <label htmlFor="senderId">senderId :</label>
          <input type="text" id="senderId" ref={senderIdRef} />
        </div>
        <div>
          <label htmlFor="senderName">senderName :</label>
          <input type="text" id="senderName" ref={senderNameRef} />
        </div>
        <div>
          <label htmlFor="receiverId">receiverId :</label>
          <input type="text" id="receiverId" ref={receiverIdRef} />
        </div>
        <div>
          <label htmlFor="receiverName">receiverName :</label>
          <input type="text" id="receiverName" ref={receiverNameRef} />
        </div>
        <div>
          <label htmlFor="type">type :</label>
          <input type="text" id="type" ref={typeRef} />
        </div>
        <div>
          <label htmlFor="index">index :</label>
          <input type="text" id="index" ref={indexRef} />
        </div>
        <div>
          <label htmlFor="message">message : </label>
          <input type="text" id="message" ref={messageRef} />
        </div>
        <button onClick={messageSendHandler}>send</button>
      </form>
      <AlertOnair/>
    </div>
  );
};

export default WebsocketPage;
