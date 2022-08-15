package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;


// BaseTimeEntity로 알림확인일시를 잘 가공해주면 좋을 듯!
@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Alert extends BaseTimeEntity {
    // "alertIndex, senderId,senderName, receiverId, receiverName, type, index, 메시지"
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    @JsonBackReference
    private Member sender;

//    private String senderName;
    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    @JsonBackReference
    private Member receiver;

    private String type;

    private Long sequence;

    private String message;

    private int is_read;

    public void read(){
        this.is_read = 1;
    }

    @Override
    public String toString(){
        String str = id + " " + sender.getId() + " "+receiver.getId()
                ;
        return str;
    }
}
