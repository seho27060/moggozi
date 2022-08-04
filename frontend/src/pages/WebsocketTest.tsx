import { FormEvent, useRef } from "react";
// import SockJS from "sockjs-client";
// import WebSocketProvider from "../lib/WebSocketProvider";

const WebsocketPage = () => {
  const messageRef = useRef<HTMLInputElement>(null)

  // 웹소켓
  function onClose(evt: any) {
    alert("연결 끊김");
  }
  function onOpen(evt:any) {
    console.log("open");
    wsocket?.send("open request from SEHO");
  };
  // // 보내는 사람/ 받는사람/ 알림타입:포스팅좋아요,댓글..등등등
  function onSend() {
    wsocket?.send(JSON.stringify(messageRef.current!.value))

    console.log('send',messageRef.current!.value)
  }
  const messageSendHandler = (event:FormEvent) =>{
    event.preventDefault()

    onSend()
  }
   var wsocket: WebSocket | null = null;
  wsocket = new WebSocket("ws://i7c201.p.ssafy.io:8080/ws/notification");
  wsocket.onclose = onClose;
  wsocket.onopen = onOpen

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
        <input type="text" id="message" ref={messageRef}/>
        <button onClick={messageSendHandler}>send</button>
      </form>
    </div>
  );
};

export default WebsocketPage;
