package com.JJP.restapiserver.domain.dto.challenge;

import com.JJP.restapiserver.domain.dto.tag.TagRequestDto;
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
    private Long member_id;
    private String name;
    private String challenge_img;
    private String content;
    private int level;
    private List<TagRequestDto> hobby = new ArrayList<>();
    // 작성중, 등록 완료
    private int state;
    private String description;
}
