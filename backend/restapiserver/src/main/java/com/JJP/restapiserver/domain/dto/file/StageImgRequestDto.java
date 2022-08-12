package com.JJP.restapiserver.domain.dto.file;

import com.JJP.restapiserver.domain.entity.file.PostImg;
import com.JJP.restapiserver.domain.entity.file.StageImg;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StageImgRequestDto {
    private int id;
    private String path;
}