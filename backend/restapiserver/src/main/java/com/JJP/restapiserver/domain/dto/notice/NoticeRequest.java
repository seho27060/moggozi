package com.JJP.restapiserver.domain.dto.notice;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeRequest {

    String title;
    String content;

}
