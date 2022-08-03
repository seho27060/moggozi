package com.JJP.restapiserver.handler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Component
public class EchoHandler extends TextWebSocketHandler {

    public EchoHandler(){};
    //로그인 한 전체
    List<WebSocketSession> sessions = new ArrayList<WebSocketSession>();
    // 1대1
    Map<String, WebSocketSession> userSessionsMap = new HashMap<String, WebSocketSession>();

    //서버에 접속이 성공 했을때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        System.out.println("연결 됐음");
        String senderEmail = getEmail(session);
        userSessionsMap.put(senderEmail , session);
    }

    //소켓에 메세지를 보냈을때
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
//		String senderEmail = getEmail(session);
        //모든 유저에게 보낸다 - 브로드 캐스팅
//		for (WebSocketSession sess : sessions) {
//			sess.sendMessage(new TextMessage(senderNickname + ": " +  message.getPayload()));
//		}

        System.out.println("메세지 받았음!!!");
        //protocol : cmd , 댓글작성자, 게시글 작성자 , seq (reply , user2 , user1 , 12)
        String msg = message.getPayload();
        System.out.println(msg);
        if(StringUtils.isNotEmpty(msg)) {
            String[] strs = msg.split(",");

            if(strs != null && strs.length == 5) {
                String cmd = strs[0];
                String caller = strs[1];
                String receiver = strs[2];
                String receiverEmail = strs[3];
                String seq = strs[4];

                //작성자가 로그인 해서 있다면
                WebSocketSession boardWriterSession = userSessionsMap.get(receiverEmail);

                if("reply".equals(cmd) && boardWriterSession != null) {
                    TextMessage tmpMsg = new TextMessage(caller + "님이 " +
                            "<a type='external' href='/mentor/menteeboard/menteeboardView?seq="+seq+"&pg=1'>" + seq + "</a> 번 게시글에 댓글을 남겼습니다.");
                    boardWriterSession.sendMessage(tmpMsg);

                }else if("follow".equals(cmd) && boardWriterSession != null) {
                    TextMessage tmpMsg = new TextMessage(caller + "님이 " + receiver +
                            "님을 팔로우를 시작했습니다.");
                    boardWriterSession.sendMessage(tmpMsg);

                }else if("scrap".equals(cmd) && boardWriterSession != null) {
                    TextMessage tmpMsg = new TextMessage(caller + "님이 " +
                            //변수를 하나더 보낼수 없어서 receiver 변수에 member_seq를 넣어서 썼다.
                            "<a type='external' href='/mentor/essayboard/essayboardView?pg=1&seq="+seq+"&mentors="+ receiver +"'>" + seq + "</a>번 에세이를 스크랩 했습니다.");
                    boardWriterSession.sendMessage(tmpMsg);
                }
            }
            // 모임 신청 했을때
            if(strs != null && strs.length == 5) {
                String cmd = strs[0];
                String mentee_name = strs[1];
                String mentor_email = strs[2];
                String meetingboard_seq = strs[3];
                String participation_seq = strs[4];

                // 모임 작성한 멘토가 로그인 해있으면
                WebSocketSession mentorSession = userSessionsMap.get(mentor_email);
                if(cmd.equals("apply") && mentorSession != null) {
                    TextMessage tmpMsg = new TextMessage(
                            mentee_name + "님이 모임을 신청했습니다. " +"<a type='external' href='/mentor/participation/participationView?mseq="+ meetingboard_seq +"&pseq="+ participation_seq +"'>신청서 보기</a>");
                    mentorSession.sendMessage(tmpMsg);
                }
            }
        }
    }

    //연결 해제될때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        //System.out.println("afterConnectionClosed " + session + ", " + status);
        userSessionsMap.remove(session.getId());
        sessions.remove(session);
    }

    //웹소켓 email 가져오기
    private String getEmail(WebSocketSession session) {
        Map<String, Object> httpSession = session.getAttributes();
        String loginUser = (String)httpSession.get("memberEmail");

        if(loginUser == null) {
            return session.getId();
        } else {
            return loginUser;
        }
    }
}