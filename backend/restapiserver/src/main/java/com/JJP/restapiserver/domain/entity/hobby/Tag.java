package com.JJP.restapiserver.domain.entity.hobby;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 20)
    private String tag;
}
