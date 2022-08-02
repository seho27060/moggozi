package com.JJP.restapiserver.domain.dto.member.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateInfoResponse {

    private Long id;
    private String username;
    private String fullname;
    private String nickname;
    private String introduce;
    private String userImg;
    private int isPrivate;

}
