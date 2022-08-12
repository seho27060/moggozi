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
    public Writer(Long id, String nickname, String path){
        this.id =id;
        this.nickname = nickname;
        this.path = path;
    }

}
