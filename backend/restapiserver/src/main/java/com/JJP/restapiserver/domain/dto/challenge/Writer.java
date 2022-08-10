package com.JJP.restapiserver.domain.dto.challenge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Writer {
    public Long id;
    public String nickname;

    public Writer(Long id, String nickname){
        this.id =id;
        this.nickname = nickname;
    }

}
