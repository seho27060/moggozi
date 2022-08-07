import { FormEvent, MouseEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const WebsocketPage = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const messageRef = useRef<HTMLInputElement>(null);
  const receiverIdRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const senderIdRef = useRef<HTMLInputElement>(null);
  const senderNameRef = useRef<HTMLInputElement>(null);
  const indexRef = useRef<HTMLInputElement>(null);
  const receiverNameRef = useRef<HTMLInputElement>(null);

  var wsocket: WebSocket | null = null;
  wsocket = new WebSocket("wss://i7c201.p.ssafy.io:443/api/ws/notification")
  let jsonSend = {
    index: "1",
    message: "message",
    receiverId: "1",
    receiverName: "start",
    senderId: "36",
    senderName: "seh",
    type: "register",
  };

  const connect = (wsocket:WebSocket|null) => {
    wsocket = new WebSocket("wss://i7c201.p.ssafy.io:443/api/ws/notification");

    wsocket!.onopen = function onOpen(evt: any) {
      if (isLoggedIn) {
        jsonSend.senderId = user.id!.toString();
        jsonSend.senderName = user.nickname!.toString();
      }
      console.log("open", evt, "open user", jsonSend);
      wsocket?.send(JSON.stringify(jsonSend));
    };
    wsocket!.onclose = function onClose(evt: any) {
      console.log("연결 끊김", evt);
      setTimeout(function () {
        console.log("reconnect after a second")
        connect(wsocket);
      }, 1000);
      // setConnectState(true)
    };
    wsocket!.onerror = function onError(evt: any) {
      console.log("ERR", evt);
    };
    wsocket!.onmessage = function onMessage(evt: MessageEvent) {
      console.log("form server :", evt);
      console.log(evt.data);
      // // 보내는 사람/ 받는사람/ 알림타입:포스팅좋아요,댓글..등등등
    };
  };
  function onSend() {
    //senderId,senderName, receiverId, receiverName, type, index
    jsonSend.message = messageRef.current!.value;
    jsonSend.senderId = senderIdRef.current!.value;
    jsonSend.index = senderIdRef.current!.value;
    jsonSend.type = typeRef.current!.value;
    jsonSend.receiverId = receiverIdRef.current!.value;
    jsonSend.receiverName = receiverNameRef.current!.value;
    jsonSend.senderName = senderIdRef.current!.value;

    wsocket!.send(JSON.stringify(jsonSend));

    console.log("send to", receiverIdRef.current?.value, "json :", jsonSend);
    messageRef.current!.value = "";
  }

  const messageSendHandler = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };

  // 웹소켓 연결
  connect(wsocket)

  const connectHandler = (event: MouseEvent) => {
    event.preventDefault()
    connect(wsocket)
  }
  return (
    <div>
      <h1>WebSocket TEST</h1>
      <button onClick={connectHandler}>open</button>
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
    </div>
  );
};

export default WebsocketPage;
