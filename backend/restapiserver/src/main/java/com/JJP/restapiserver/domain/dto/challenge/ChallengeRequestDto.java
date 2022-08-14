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
    private Long memberId;
    private String name;
    private String img;
    private String content;
    private int level;
    private List<TagRequestDto> hobbyList = new ArrayList<>();
    // 작성중, 등록 완료
    private String description;
}
