package com.JJP.restapiserver.domain.dto.member.request;


import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {

    @NotBlank
    @Size(min = 3, max = 30)
    private String username; // email

    @NotBlank
    @Size(max = 20)
    private String fullname;

    @NotBlank
    @Size(min = 3, max = 10)
    private String nickname;

    @Size(max = 100)
    private String introduce;

    @Size(max = 300)
    private String userImg;

    private int isPrivate; // 0: 공개 X, 1: 공개 O
}
