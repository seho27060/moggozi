package com.JJP.restapiserver.domain.stage;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.stage.StageRepository;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Transactional
@WebAppConfiguration
@RunWith(SpringRunner.class)
@SpringBootTest
public class StageRepositoryTest {

    @Autowired
    StageRepository stageRepository;

    @After
    public void cleanup(){
        stageRepository.deleteAll();
    }

    @Test
    public void 스테이지저장_테스트(){
        String name = "테스트단계";
        String content = "테스트설명";

        stageRepository.save(Stage.builder()
                .name(name)
                .content(content)
                .build());

        //when
        List<Stage> stageList = stageRepository.findAll();

        //then
        Stage stages = stageList.get(0);
        assertThat(stages.getName()).isEqualTo(name);
        assertThat(stages.getContent()).isEqualTo(content);
    }
}
