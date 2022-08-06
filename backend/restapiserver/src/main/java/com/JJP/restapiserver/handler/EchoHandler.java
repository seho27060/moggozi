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
    Map<Long, WebSocketSession> userSessionsMap = new HashMap<Long, WebSocketSession>();

    //서버에 접속이 성공 했을때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        Long senderId = getId(session);
        System.out.println("연결 됐음 + " + senderId);
        userSessionsMap.put(senderId , session);
        System.out.println(userSessionsMap.keySet());
        System.out.println(userSessionsMap.values());
    }

    //소켓에 메세지를 보냈을때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//		String senderEmail = getEmail(session);
        //모든 유저에게 보낸다 - 브로드 캐스팅
//		for (WebSocketSession sess : sessions) {
//			sess.sendMessage(new TextMessage( message.getPayload()));
//		}

        System.out.println("메세지 받았음!!!");

        String strJson = message.getPayload();
        System.out.println(strJson);


        JSONObject jsonObj = new JSONObject(strJson);

        // "alertIndex, senderId,senderName, receiverId, receiverName, type, index, 메시지"
        if(StringUtils.isNotEmpty(strJson)) {
            Long senderId = Long.parseLong(jsonObj.getString("senderId"));
            String senderName = jsonObj.getString("senderName");
            Long receiverId = Long.parseLong(jsonObj.getString("receiverId"));
            String receiverName = jsonObj.getString("receiverName");
            String type = jsonObj.getString("type");
            Long index = Long.parseLong(jsonObj.getString("index"));

            System.out.println(senderId);
            System.out.println(senderName);
            System.out.println(receiverId);
            System.out.println(receiverName);
            System.out.println(type);
            System.out.println(index);

            if(true) {
                // 알림을 받아야 하는 사람이 로그인 해서 있다면
                // userSessionMap에서 그 값을 찾아봐야 함.
                WebSocketSession receiver = userSessionsMap.get(receiverId);
//                WebSocketSession sender = userSessionsMap.get(-1L);

//                if(receiver == null){
//                    System.out.println("수신자가 로그아웃된 상태");
//                }
                System.out.println(receiver);
                String msg = senderName + "님이 등록하신 챌린지에 좋아요를 눌렀습니다.";
                receiver.sendMessage(new TextMessage(msg));
                // 알람이 챌린지에서부터 온 것이고 == 챌린지 좋아요 발생
                if(type.equals("challenge") && receiver != null) {
                    System.out.println("여기까진 오나?");
                    // 알림 저장 - B
                    // 알림 전송 - B
                    // 알림의 내용물이 무엇이냐 ->  "senderId,senderName, receiverId, receiverName, 게시물 type, 게시물의 index"
                    // 메세지 처리 -> F
//                    String msg = senderName + "님이 등록하신 챌린지에 좋아요를 눌렀습니다.";
                    // 알림 저장
                    AlertResponseDto alertResponseDto = saveAlarm(senderId, receiverId, type, index, msg);

                    TextMessage tmpMsg = new TextMessage(alertResponseDto.toString());
//                    receiver.sendMessage(tmpMsg);
                    receiver.sendMessage(tmpMsg);

//                }else if(type.equals("post") && receiver != null) {
//                    TextMessage tmpMsg = new TextMessage(senderName + "님이 포스트에 좋아요를 눌렀습니다.");
//                    receiver.sendMessage(tmpMsg);
                }
            }
        }
    }

    //연결 해제될때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        System.out.println("연결이 끊겼음");
        userSessionsMap.remove(session.getId());
        sessions.remove(session);
    }

    //웹소켓 email 가져오기
    private Long getId(WebSocketSession session) {
        Map<String, Object> httpSession = session.getAttributes();
        System.out.println("----------------핸들러 속에서--------------------------");
        System.out.println(httpSession);
        System.out.println(httpSession.getClass());
        System.out.println(httpSession.keySet());
        System.out.println("서버 세션 체크");
        System.out.println("------------------------------------------");
        Long loginUser = (Long)httpSession.get("memberId");

        if(loginUser == null) {
            return -1L;
        } else {
            return loginUser;
        }
    }

    private AlertResponseDto saveAlarm(Long senderId, Long receiverId, String type, Long index, String msg){
        return alertService.saveAlert(senderId, receiverId, type, index, msg);
    }
}