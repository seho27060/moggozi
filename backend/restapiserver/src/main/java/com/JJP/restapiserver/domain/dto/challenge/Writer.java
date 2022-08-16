package com.JJP.restapiserver.domain.dto.challenge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Writer {
    public Long id;
    public String nickname;

    public String path;
    public Long score;
    public Writer(Long id, String nickname, String path, Long score){
        this.id =id;
        this.nickname = nickname;
        this.path = path;
        this.score = score;
    }

}
