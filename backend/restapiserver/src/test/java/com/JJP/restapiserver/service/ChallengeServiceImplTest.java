package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.ChallengeRepository;
import com.JJP.restapiserver.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@Transactional
@SpringBootTest
public class ChallengeServiceImplTest {

    @Autowired
    private ChallengeService challengeService;


    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private EntityManager em;

    @Test
    public void 멤버와챌린지저장되나요() {
        Member member = Member.builder()
                .username("chob58@naver.com")
                .username("cho")
                .nickname("witboon")
                .introduce("I am good")
                .password("123")
                .user_img("nothing")
                .is_private(0).build();
        memberRepository.save(member);


        Challenge challenge = Challenge.builder()
                .name("test_challenge")
//                .member(member)
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();

        challengeRepository.save(challenge);
        Member member1 = memberRepository.findById(1L).get();
        Challenge challenge1 = challengeRepository.findAll().get(0);

        // 데이터에 들어가긴 함
        // 다만 왠지 모르게 영속 컨텍스트에 캐싱이 안 되어 있는 듯함
        assertEquals(member.getUsername(), member1.getUsername());
        assertEquals(challenge.getName(), challenge1.getName());

    }

    @Test
    public void 취미별챌린지리스트반환테스트() {
        Challenge challenge = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();
        Challenge challenge1 = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();
        Challenge challenge2 = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();

        Challenge challenge3 = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("soccer")
                .state(0)
                .build();
        Challenge challenge4 = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("soccer")
                .state(0)
                .build();
        challengeRepository.save(challenge);
        challengeRepository.save(challenge1);
        challengeRepository.save(challenge2);
        challengeRepository.save(challenge3);
        challengeRepository.save(challenge4);

        String hobby = "soccer";
        assertNotNull(challengeRepository.findByHobby(hobby));
        assertEquals(challengeRepository.findByHobby(hobby).get(0).getHobby(), hobby);
    }


    @Test
    public void 챌린지이름키워드검색테스트(){
        String keyword = "es";
        Challenge challenge = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();
        Challenge challenge1 = Challenge.builder()
                .name("abc")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();
        challengeRepository.save(challenge);
        challengeRepository.save(challenge1);

        assertEquals(challenge.getName(), challengeRepository.findByNameContaining(keyword).get(0).getName());
        assertEquals(challenge1.getName(), challengeRepository.findByNameContaining("bc").get(0).getName());
    }

    @Test
    public void getChallengeDetail() {
        Challenge challenge = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();
        challengeRepository.save(challenge);
        assertEquals(challenge, challengeRepository.findById(1L).get());
    }

    @Test
    public void deleteChallenge()
    {
        Challenge challenge = Challenge.builder()
                .name("test_challenge")
                .challenge_img("nothing")
                .content("nothing because this is test")
                .level(0)
                .hobby("golf")
                .state(0)
                .build();
        challengeRepository.save(challenge);
        challengeRepository.delete(challenge);

        assertEquals(challengeRepository.findAll().size(), 0);
    }
}