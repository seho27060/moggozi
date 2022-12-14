package com.JJP.restapiserver.handler;

import java.io.IOException;
import java.time.LocalDateTime;
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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private final Logger logger = LoggerFactory.getLogger(EchoHandler.class);

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    private final AlertRepository alertRepository;

    private final AlertService alertService;
    //로그인 한 전체
    List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();
    // 1대1
//    Map<Long, WebSocketSession> userSessionsMap = new HashMap<>();
    Map<WebSocketSession, Long> userSessionsMap = new HashMap<>();

    /// 1. 연결을 할때마다 이루어져야할 동작
    // 맨 처음에 var socket = new websokcket("url");
    // 이 뒤에 내가 누구인지를 나타내는 register 타입을 담은 메세지를 하나 보냄.
    //서버에 접속이 성공 했을때

    //
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        logger.debug("-------------연결 시작--------");
        sessions.add(session);
        userSessionsMap.put(session , -1L);
        logger.debug("-----------연결 성공--------");
    }

    //소켓에 메세지를 보냈을때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Long session_val = userSessionsMap.get(session);
        String strJson = message.getPayload();
        JSONObject jsonObj = new JSONObject(strJson);

        // "alertIndex, senderId,senderName, receiverId, receiverName, type, index, 메시지"
        if (StringUtils.isNotEmpty(strJson)) {
            Long senderId = Long.parseLong(jsonObj.getString("senderId"));
            String senderName = jsonObj.getString("senderName");
            Long receiverId = Long.parseLong(jsonObj.getString("receiverId"));
            String receiverName = jsonObj.getString("receiverName");
            String type = jsonObj.getString("type");
            Long index = Long.parseLong(jsonObj.getString("index"));
            logger.debug("------- " + senderName + "님이 보낸 메시지를 수신했습니다.---------");
            logger.debug("------- 받는 이는 " + receiverName + " 입니다.-------------");
            logger.debug("-------------타입은 " + type + " 입니다. ------------------------");

            if (session_val == -1L && type.equals("register")) {
                userSessionsMap.put(session, senderId);
                return;
            }

            WebSocketSession receiver = null;
            if (userSessionsMap.containsValue(receiverId)) {
                for (WebSocketSession key : userSessionsMap.keySet()) {
                    if (userSessionsMap.get(key) == receiverId) {
                        receiver = key;
                    }
                }
            }
            String msg = "";
            if (receiver != null) {
                if (type.equals("challenge")) {
                    msg = senderName + "님이\n등록하신 챌린지에\n좋아요를 눌렀습니다.";
                }
                else if(type.equals("post")){
                    msg = senderName + "님이\n등록하신 포스트에\n좋아요를 눌렀습니다.";
                }
                else if(type.equals("comment")){
                    msg = senderName + "님이\n등록하신 포스트에\n댓글을 달았습니다.";
                }
                else if(type.equals("reply")){
                    msg = senderName + "님이\n등록하신 댓글에\n대댓글을 달았습니다.";
                }
                else if(type.equals("follow")){
                    msg = senderName + "님이\n팔로우하기\n시작했습니다.";
                }

                if(!msg.equals("")){
                    logger.debug("알림을 디비에 저장하는 로직을 실행합니다.");
                    saveAndSend(senderId, receiverId, type, index, msg, receiver);
                }
                else{
                    logger.debug("메세지가 비었습니다.");
                }
            }
            logger.debug("----------------메세지 처리 끝---------------------");
        }
    }

    //연결 해제될때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        logger.debug(userSessionsMap.get(session) + " 님의 연결이 끊어집니다.");
        sessions.remove(session);
        userSessionsMap.remove(session);
        logger.debug("------------연결 종료 -----------");
    }
    private void saveAndSend(Long senderId, Long receiverId, String type, Long index,
                             String msg, WebSocketSession receiver) throws IOException {
        AlertResponseDto alertResponseDto = saveAlarm(senderId, receiverId, type, index, msg);
        if(alertResponseDto == null){
            return;
        }
        TextMessage tmpMsg = new TextMessage(alertResponseDto.toString());
        receiver.sendMessage(tmpMsg);
    }

    private AlertResponseDto saveAlarm(Long senderId, Long receiverId, String type, Long index, String msg){
        return alertService.saveAlert(senderId, receiverId, type, index, msg);
    }
}