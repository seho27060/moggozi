import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import styles from "./AboutPage.module.scss";
import background from "../asset/about.png"

const AboutPage = () => {
  useEffect(() => {
    AOS.init();
  });

  return (
    <div className={styles.container} style={{backgroundImage: `url(${background})`, backgroundSize: 'contain'}}>
      <div className={styles.width}>
        <div className={styles.header} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">반가워요!</div>
        <div className={styles.header} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">취미 공유 서비스 모꼬지입니다!</div>

        <div className={styles.sentence_L}>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>취미를 큐레이팅하다</div>
          <div>모꼬지에서 다양한 취미를 쉽게 접하고</div>
          <div>성공스토리를 차곡차곡 쌓아보세요.</div>
          <div>'모꼬지'는 "여러 사람이 함께 즐기다"라는 뜻입니다.</div>
          </div>
        </div>

        <div className={styles.sentence_R}>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>다양한 취미가 존중받는 공간</div>
          <div>우리는 모두의 취미를 존중합니다.</div>
          <div>
            어떤 형태의 취미든 모꼬지에서 마음껏 만들고 도전할 수 있습니다.
          </div>
          <div>챌린지를 통해서 그동안 관심있었던 취미를 참여할 수 있고,</div>
          <div>스테이지를 따라 차근차근 과정을 밟아나갈 수 있습니다.</div>
          </div>
        </div>

        <div className={styles.sentence_L}>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="top-center">
          <div>모두가 마음껏 취미를 즐기는 그날까지</div>
          <div>나만 알고있기엔 아까웠던 취미가 있다면</div>
          <div>기획자가 되어 챌린지를 만들어보세요.</div>
          <div>모꼬지가 취미를 즐기는 자신만의 노하우를 공유할 수 있도록</div>
          <div>
            챌린지를 직접 만들고, 단계별 과정을 공유할 수 있도록 돕습니다.
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
