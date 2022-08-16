package com.JJP.restapiserver.domain.entity.Tag;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Tag {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<ChallengeTag> challengeTagList = new ArrayList<>();

    @Column(length = 10)
    private String tag;
}
