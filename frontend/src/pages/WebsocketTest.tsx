import { FormEvent, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const WebsocketPage = () => {
  const messageRef = useRef<HTMLInputElement>(null);
  const userIdRef = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);

  // 웹소켓
  function onClose(evt: any) {
    alert("연결 끊김");
  }
  function onOpen(evt: any) {
    console.log("open");
  }
  // // 보내는 사람/ 받는사람/ 알림타입:포스팅좋아요,댓글..등등등
  function onSend() {
    //senderId,senderName, receiverId, receiverName, type, index
    var jsonSend = {
      senderId: userId?.toString(),
      senderName: "세호팍",
      receiverId: "",
      receiverName: "성민초",
      type: "challenge",
      index: "1",
      message: "",
    };
    jsonSend.message = messageRef.current!.value;
    jsonSend.receiverId = userIdRef.current!.value;
    wsocket?.send(JSON.stringify(jsonSend));

    console.log("send to",userIdRef.current?.value,"message :", messageRef.current!.value);
    messageRef.current!.value = "";
  }
  const messageSendHandler = (event: FormEvent) => {
    event.preventDefault();
    onSend();
  };
  function onMessage(evt: MessageEvent) {
    console.log("form server :", evt);
    console.log(JSON.parse(evt.data));
  }
  var wsocket: WebSocket | null = null;
  wsocket = new WebSocket("ws://i7c201.p.ssafy.io:8080/ws/notification");
  wsocket.onclose = onClose;
  wsocket.onopen = onOpen;
  wsocket.onmessage = onMessage;

  return (
    <div>
      <h1>WebSocket TEST</h1>
      <button onClick={onOpen}>open</button>
      <form>
        <label htmlFor="userId">userId :</label>
        <input type="text" id="userId" ref={userIdRef} />
        <label htmlFor="message">message : </label>
        <input type="text" id="message" ref={messageRef} />
        <button onClick={messageSendHandler}>send</button>
      </form>
    </div>
  );
};

export default WebsocketPage;
