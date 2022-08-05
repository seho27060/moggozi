import { FormEvent, useRef } from "react";
// import SockJS from "sockjs-client";
// import WebSocketProvider from "../lib/WebSocketProvider";

const WebsocketPage = () => {
  const messageRef = useRef<HTMLInputElement>(null);

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
      senderId: "777",
      senderName: "세호팍",
      receiverId: "666",
      receiverName: "성민초",
      type: "challenge",
      index: 1,
      message: "",
    };
    jsonSend.message = messageRef.current!.value;
    wsocket?.send(JSON.stringify(jsonSend));

    console.log("send", messageRef.current!.value);
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
  // var sock = new SockJS('https://i7c201.p.ssafy.io:443/ws/notification',);
  // sock.onopen = function() {
  //     console.log('open');
  //     sock.send('test');
  // };

  // sock.onmessage = function(e) {
  //     console.log('message', e.data);
  //     sock.close();
  // };

  // sock.onclose = function() {
  //     console.log('close');
  // };

  return (
    <div>
      <h1>WebSocket TEST</h1>
      {/* <WebSocketProvider>
      </WebSocketProvider> */}
      <button onClick={onOpen}>open</button>
      <form>
        <label htmlFor="message">message : </label>
        <input type="text" id="message" ref={messageRef} />
        <button onClick={messageSendHandler}>send</button>
      </form>
    </div>
  );
};

export default WebsocketPage;
