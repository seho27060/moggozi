package com.JJP.restapiserver.controller.challenge;


import com.JJP.restapiserver.domain.dto.challenge.*;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import com.JJP.restapiserver.repository.Tag.ChallengeTagRepository;
import com.JJP.restapiserver.repository.challenge.JoinedChallengeRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.Tag.ChallengeTagService;
import com.JJP.restapiserver.service.challenge.ChallengeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

//@CrossOrigin("*")
@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private Logger logger = LoggerFactory.getLogger(ChallengeController.class);
    private final ChallengeService challengeService;

    private final JoinedChallengeRepository joinedChallengeRepository;
    @Autowired
    private final JwtUtils jwtUtils;

    @Operation(summary = "챌린지 이름 검색", description = "키워드를 포함하고 있는 챌린지들을 페이징해서 돌려주는 API")
    @GetMapping("/search")
    public ResponseEntity getChallengeListByKeyword(@RequestParam("keyword") String keyword, Pageable pageable,
                                                    HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        ChallengePageDto challengeList;
        if(member_id.isPresent())
            challengeList = challengeService.getChallengeListByKeyword(keyword, pageable, member_id.get());
        else
            challengeList = challengeService.getChallengeListByKeyword(keyword, pageable);
        return new ResponseEntity(challengeList, HttpStatus.OK);
    }

    @Operation(summary = "챌린지 좋아요 페이지 네이션 적용", description = "")
    @GetMapping("/rank")
    public ResponseEntity getChallengeListByLike(HttpServletRequest request, Pageable pageable)
    {
        Optional<Long> member_id = getMember_id(request);
        ChallengePageDto challengePageDto;
        if(member_id.isPresent())
            challengePageDto = challengeService.getChallengeListByLike(member_id.get(), pageable);
        else
            challengePageDto = challengeService.getChallengeListByLikeWithoutLogin(pageable);

        return new ResponseEntity(challengePageDto, HttpStatus.OK);
    }

    @Operation(summary = "챌린지 상세정보", description = "")
    @GetMapping("/{challenge_id}")
    public ResponseEntity getChallengeDatail(@PathVariable Long challenge_id, HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        ChallengeResponseDto challengeResponseDto;
        if(member_id.isPresent())
            challengeResponseDto = challengeService.getChallengeDetail(challenge_id, member_id.get());
        else
            challengeResponseDto = challengeService.getChallengeDetail(challenge_id);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }

    @Operation(summary = "챌린지 임시저장", description = "챌린지 임시저장 버튼과 연동됨")
    @PostMapping("/save")
    public ResponseEntity saveChallenge(@RequestBody ChallengeRequestDto challengeRequestDto, HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        ChallengeResponseDto challengeResponseDto;
        if(member_id.isPresent()){
            challengeRequestDto.setMemberId(member_id.get());
            challengeResponseDto = challengeService.saveChallenge(challengeRequestDto);
        }
        else
            return new ResponseEntity("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }

    @Operation(summary = "챌린지 등록", description = "챌린지 임시저장과는 다름, 등록하면 챌린지가 검색 결과에 노출이 됨.")
    @PutMapping("/register/{challengeId}")
    public ResponseEntity registerChallenge(@PathVariable Long challengeId, HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        if(member_id.isPresent()){
            Optional<ChallengeResponseDto> result = Optional.ofNullable(challengeService.registerChallenge(member_id.get(), challengeId));
            if(result.isPresent()){
                return new ResponseEntity(result.get(), HttpStatus.OK);
            }
            return new ResponseEntity("등록할 챌린지가 없습니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "챌린지 변경", description = "")
    @PutMapping("/{challenge_id}")
    public ResponseEntity updateChallenge(@PathVariable Long challenge_id, @RequestBody ChallengeRequestDto challengeRequestDto
                ,HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        if(member_id.isPresent()){
            challengeRequestDto.setMemberId(member_id.get());
            Optional<ChallengeResponseDto> result = Optional.of(challengeService.updateChallenge(challenge_id, challengeRequestDto));
            if(result.isPresent())
                return new ResponseEntity(result.get(), HttpStatus.OK);
            else
                return new ResponseEntity("등록된 상태의 챌린지를 변경할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }
    @Operation(summary = "챌린지 삭제", description = "")
    @DeleteMapping("/{challenge_id}")
    public ResponseEntity deleteChallenge(@PathVariable Long challenge_id, HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        if(member_id.isPresent()){
            int response = challengeService.deleteChallenge(member_id.get(), challenge_id);
            if(response == 1)
                return new ResponseEntity(HttpStatus.OK);
            else if(response == -2)
                return new ResponseEntity("본인만 삭제할 수 있습니다.", HttpStatus.BAD_REQUEST);
            else if(response == -1)
                return new ResponseEntity("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
            else
                return new ResponseEntity("등록된 챌린지는 삭제할 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
        else
            return new ResponseEntity("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "챌린지 완료 버튼", description = "챌린지 완료 버튼 누를 시 연동되는 API")
    @PutMapping("/complete/{challenge_id}")
    public ResponseEntity completeChallenge(@PathVariable Long challenge_id, HttpServletRequest request)
    {
        Optional<Long> member_id = getMember_id(request);
        if(member_id.isPresent()){
            challengeService.completeChallenge(member_id.get(), challenge_id);

        }
        else
            return new ResponseEntity("잘못된 요청입니다.", HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "최근 참여한 챌린지", description = "최근 참여한 챌린지 페이지네이션 적용")
    @GetMapping("/recentCh")
    public ResponseEntity recentChallenge(HttpServletRequest request, Pageable pageable){
        Optional<Long> member_id = getMember_id(request);
        Optional<ChallengePageDto> challengePageDto;
        if(member_id.isPresent()){
             challengePageDto = Optional.ofNullable(challengeService.getByMember_idOrderByModifiedDateDesc(member_id.get(),
                    pageable));
            if(challengePageDto.isEmpty()){
                return new ResponseEntity("최근 참여하신 챌린지가 없습니다.", HttpStatus.OK);
            }
            return new ResponseEntity(challengePageDto.get(), HttpStatus.OK);
        }
        return new ResponseEntity("액세스 토큰에 유저 아이디가 없습니다.", HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "태그를 포함하는 챌린지 검색", description = "페이지네이션 적용된 API")
    @GetMapping("/tag/search/")
    public ResponseEntity getChallengeContainingTag(@RequestParam("keyword") String keyword, Pageable pageable,
                                                    HttpServletRequest request){
        logger.debug("-----------컨트롤러 시작---------------");
        ChallengePageDto challengePageDto = null;
        if(request.getHeader("Authorization") == null){
             challengePageDto = challengeService.getChallengeContainingTag(keyword,
                    pageable);
        }
        else{
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

            challengePageDto = challengeService.getChallengeContainingTag(keyword,
                pageable, member_id);
        }
        logger.debug("------------컨트롤러 종료---------------");
        return new ResponseEntity(challengePageDto, HttpStatus.OK);
    }

    @Operation(summary = "만든 챌린지", description = "내가 만든 챌린지 API")
    @GetMapping("/myChallenge")
    public ResponseEntity getMyChallenge(HttpServletRequest request, Pageable pageable){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        ChallengePageDto challengePageDto = challengeService.getMyChallenge(member_id, pageable);
        return new ResponseEntity(challengePageDto, HttpStatus.OK);
    }

    @Operation(summary = "추천챌린지", description = "사용자 맞춤 추천 챌린지 API")
    @GetMapping("/recommendation")
    public ResponseEntity getRecommendationList(HttpServletRequest request){
        if(request.getHeader("Authorization") != null){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<ChallengeListResponseDto> challengeListResponseDtoList = challengeService.getChallengeRecommendationList(member_id, 5);
        return new ResponseEntity(challengeListResponseDtoList, HttpStatus.OK);
        }
        else{
            List<ChallengeListResponseDto> challengeListResponseDtoList = challengeService.getChallengeRecommendationList(-1L,5);
            return new ResponseEntity(challengeListResponseDtoList, HttpStatus.OK);
        }
    }

    @Operation(summary = "챌린지 도전", description = "챌린지 도전 버튼을 눌렀을 시 연결되는 API")
    @PostMapping("/tryChallenge")
    public ResponseEntity tryChallenge(@RequestBody ChallengeUpdateRequestDto challengeRequestDto){
        boolean response = challengeService.tryChallenge(challengeRequestDto);
        if(response == true){
            return new ResponseEntity("챌린지에 도전하셨습니다.", HttpStatus.OK);
        }
        return new ResponseEntity("이미 챌린지에 도전하셨습니다.", HttpStatus.BAD_REQUEST);
    }

    @Operation(summary = "챌린지 도전 취소", description = "챌린지 도전 취소 버튼과 연결되는 API")
    @DeleteMapping("/cancelChallenge/{challenge_id}")
    public ResponseEntity cancelChallenge(@PathVariable Long challenge_id, HttpServletRequest request){
        Optional<Long> member_id = getMember_id(request);
        if(member_id.isPresent()){
            challengeService.cancelChallenge(member_id.get(), challenge_id);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    public Optional<Long> getMember_id(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return Optional.ofNullable(member_id);
    }
}
