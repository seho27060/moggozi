import React, { useRef } from 'react';
// import SockJS from 'sockjs-client';
const WebSocketContext = React.createContext<any>(null);
export { WebSocketContext };

export default ({ children }: { children: React.ReactNode }) => {
  const webSocketUrl = `ws://i7c201.p.ssafy.io:8080/ws/notification/ws`
  let ws = useRef<WebSocket | null>(null);
  // let sock = new SockJS(webSocketUrl)
  if (!ws.current) {
    ws.current = new WebSocket(webSocketUrl);
    ws.current.onopen = () => {
      console.log("connected to " + webSocketUrl);
    }
    ws.current.onclose = error => {
      console.log("disconnect from " + webSocketUrl);
      console.log(error);
    };
    ws.current.onerror = error => {
      console.log("connection error " + webSocketUrl);
      console.log(error);
    };
    ws.current.onmessage = (evt:MessageEvent) => {
      console.log(evt.data)
      // console.log(JSON.parse(ev))
      
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  );
}