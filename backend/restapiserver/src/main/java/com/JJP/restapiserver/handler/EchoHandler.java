package com.JJP.restapiserver.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.JJP.restapiserver.domain.dto.member.response.AlertResponseDto;
import com.JJP.restapiserver.domain.entity.member.Alert;
import com.JJP.restapiserver.repository.member.AlertRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.service.member.AlertService;
import com.JJP.restapiserver.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.json.JSONObject;
import org.springframework.security.oauth2.client.web.server.WebSessionOAuth2ServerAuthorizationRequestRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
@RequiredArgsConstructor
public class EchoHandler extends TextWebSocketHandler {

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    private final AlertRepository alertRepository;

    private final AlertService alertService;
//    public EchoHandler(){};
    //로그인 한 전체
    List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();
    // 1대1
//    Map<Long, WebSocketSession> userSessionsMap = new HashMap<>();
    Map<WebSocketSession, Long> userSessionsMap = new HashMap<>();

    //서버에 접속이 성공 했을때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
//        Long senderId = getId(session);
        System.out.println("연결 됐음");
        userSessionsMap.put(session , -1L);
    }

    //소켓에 메세지를 보냈을때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//

        System.out.println("메세지 받았음!!!");
        String strJson = message.getPayload();
//        System.out.println(strJson);
        JSONObject jsonObj = new JSONObject(strJson);

        // "alertIndex, senderId,senderName, receiverId, receiverName, type, index, 메시지"
        if(StringUtils.isNotEmpty(strJson)) {
            Long senderId = Long.parseLong(jsonObj.getString("senderId"));
            String senderName = jsonObj.getString("senderName");
            Long receiverId = Long.parseLong(jsonObj.getString("receiverId"));
            String receiverName = jsonObj.getString("receiverName");
            String type = jsonObj.getString("type");
            Long index = Long.parseLong(jsonObj.getString("index"));

            if(userSessionsMap.get(session) == -1L && type.equals("register")){
                userSessionsMap.put(session, senderId);
                return;
            }
            WebSocketSession receiver = null;
            if(userSessionsMap.containsValue(receiverId))
            {
                for(WebSocketSession key : userSessionsMap.keySet())
                {
                    if(userSessionsMap.get(key) == receiverId){
                        receiver = key;
                    }
                }
            }

            if(type.equals("challenge"))
                if(receiver != null) {
                    // 알림을 받아야 하는 사람이 로그인 해서 있다면
                    // userSessionMap에서 그 값을 찾아봐야 함.
                    System.out.println("--------수신자 소켓세션------");
                    System.out.println(receiver);
                    System.out.println("--------수신자 소켓세션------");

                    String msg = senderName + "님이 등록하신 챌린지에 좋아요를 눌렀습니다.";
                    AlertResponseDto alertResponseDto = saveAlarm(senderId, receiverId, type, index, msg);

                    TextMessage tmpMsg = new TextMessage(alertResponseDto.toString());
                    receiver.sendMessage(tmpMsg);
                }
            }
        }

    //연결 해제될때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("연결이 끊겼음");
        sessions.remove(session);
        userSessionsMap.remove(session);
    }

    //웹소켓 email 가져오기
//    private Long getId(WebSocketSession session) {
//        Map<String, Object> httpSession = session.getAttributes ();
//        System.out.println("----------------핸들러 속에서--------------------------");
//        System.out.println(httpSession);
//        System.out.println(httpSession.getClass());
//        System.out.println(httpSession.keySet());
//        System.out.println("서버 세션 체크");
//        System.out.println("------------------------------------------");
//        Long loginUser = (Long)httpSession.get("memberId");
//
//        if(loginUser == null) {
//            return -1L;
//        } else {
//            return loginUser;
//        }
//    }

    private AlertResponseDto saveAlarm(Long senderId, Long receiverId, String type, Long index, String msg){
        return alertService.saveAlert(senderId, receiverId, type, index, msg);
    }
}