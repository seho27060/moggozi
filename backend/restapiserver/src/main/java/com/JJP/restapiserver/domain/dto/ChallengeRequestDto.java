package com.JJP.restapiserver.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeRequestDto {
    public Long user_id;
    public String name;
    public String challenge_img;
    public String content;
    public int level;
    public List<String> tagList = new ArrayList<>();
    // 작성중, 등록 완료
    public int state;
}
