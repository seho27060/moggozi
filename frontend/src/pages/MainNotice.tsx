import styles from "./MainNotice.module.scss";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import image1 from "../asset/main_notice/001.png"
import image2 from "../asset/main_notice/002.png"
import image3 from "../asset/main_notice/003.png"
import image4 from "../asset/main_notice/004.png"
import image5 from "../asset/main_notice/005.png"
import image6 from "../asset/main_notice/006.png"
import image7 from "../asset/main_notice/007.png"
import image8 from "../asset/main_notice/008.png"

const MainNotice = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        {/* 1 */}

        <div className={styles.image1} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <img src={image1} alt="" />
        </div>

        <div className={styles.sentence1} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <div>꼭꼭 숨겨왔던 나만의 취미가 있나요?</div>
          <div>자신의 취미를 챌린지로 등록해보세요.</div>
          <div>자신만의 노하우를 듬뿍 담아 도전과제를 생성할 수 있습니다.</div>
        </div>


        {/* 2 */}
        <div className={styles.image2} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image2} alt="" />
        </div>

        <div className={styles.sentence2} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <div>챌린지 생성</div>
          <div>짧은 소개는 메인화면에 보여집니다.</div>
          <div>난이도도 조정할 수 있고</div>
          <div>나만의 태그를 지정할 수도 있어요</div>
          <div>에디터를 이용하여 챌린지에 대한 자세한 설명을 적어주세요.</div>
        </div>


        {/* 3 */}
        <div className={styles.image3} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image3} alt="" />
        </div>
        <div className={styles.odd}>
        <div className={styles.sentence3} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <div>스테이지 생성</div>
          <div>챌린지를 등록했다면 도전과제가 빠질 수 없습니다.</div>
          <div>우리는 도전과제를 스테이지라고 일컫습니다.</div>
          <div>나만의 순서로 취미를 즐길 수 있는</div>
          <div>스테이지를 완성해보세요.</div>
        </div>
        </div>

        {/* 4 */}

        <div className={styles.image4} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image4} alt="" />
        </div>

        <div className={styles.sentence4} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <div>스테이지 이미지 등록하기</div>
          <div>스테이지 등록이 완료되면 수정 버튼을 눌러보세요</div>
          <div>스테이지 별 이미지를 등록할 수 있습니다.</div>
          <div>완성된 스테이지입니다. 멋지지 않나요?</div>
        </div>


        {/* 5 */}
    
        <div className={styles.image5} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image5} alt="" />
        </div>
        <div className={styles.odd}>
        <div className={styles.sentence5} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>마이페이지에서 확인하기</div>
          <div>자신이 등록한 챌린지는 마이페이지에서 확인할 수 있어요.</div>
          <div>마이페이지에서 포스팅, 도전한 챌린지, 팔로우, 팔루워 등</div>
          <div>다양한 정보도 같이 볼 수 있어 유용합니다.</div>
        </div>
        </div>
        {/* 6 */}

        <div className={styles.image6} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image6} alt="" />
        </div>

        <div className={styles.sentence6} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>검색하기</div>
          <div>자신이 찾고 있는 취미가 없나요?</div>
          <div>검색을 통해 취미와 도전과제를 찾아보세요.</div>
          <div>
            키워드와 관련한 유저, 챌린지, 태그 정보를 검색할 수 있습니다.
          </div>
        </div>

        {/* 7 */}

        <div className={styles.image7} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image7} alt="" />
        </div>
        <div className={styles.odd}>
        <div className={styles.sentence7} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>챌린지 도전, 포스팅 작성</div>
          <div>원하는 챌린지에 도전했나요?</div>
          <div>챌린지 별 각 스테이지를 완료하고 포스팅을 작성해보세요.</div>
          <div>자신의 스토리를 포스팅으로 등록하고</div>
          <div>많은 사람들과 공유할 수 있습니다.</div>
        </div>
        </div>


        {/* 8 */}

        <div className={styles.image8} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center" >
          <img src={image8} alt="" />
        </div>

        <div className={styles.sentence8} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>리뷰와 댓글</div>
          <div>같은 챌린지에 도전한 유저들과 다양하게 소통해보세요.</div>
          <div>챌린지를 완료한 후 리뷰를 작성할 수 있고,</div>
          <div>
            다른 유저의 포스팅에 댓글을 달고 공감 버튼을 누를 수 있습니다.
          </div>
        </div>
      </div>

      <div className={styles.top} onClick={() => {window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: 0,

      })}}><KeyboardDoubleArrowUpIcon /></div>
    </div>
  );
};

export default MainNotice;
