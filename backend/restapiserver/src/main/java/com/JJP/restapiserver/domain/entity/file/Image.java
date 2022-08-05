package com.JJP.restapiserver.domain.entity.file;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Image extends BaseTimeEntity {

    @Id
    @Column(name = "image_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // 파일 경로

    private String type; // 파일 타입

///* TODO: 이미지 크기 정해줄 것!!!! */
//    private byte[] data;

    @Builder
    public Image(String name, String type) {
        this.name = name;
        this.type = type;
    }

}
