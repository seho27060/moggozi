package com.JJP.restapiserver.domain.dto.notice;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeResponse {
    Long noticeId;
    String title;
    String content;
    String createdDate;
    String updatedDate;
}
