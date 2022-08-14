import React, { useState } from "react";
import Slider from "react-slick";

import styles from "./MainSlider.module.scss"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";

// interface Props {
//   children: React.ReactNode;
// }

interface NextArrowProps {
  // className?: any;
  // style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function NextArrow({ onClick }: NextArrowProps) {
  return (<div style={{ display: 'inline-block', position: "relative", bottom: "58px", left: "110px" }} onClick={onClick}><ArrowForwardIosIcon style={{cursor: "pointer", color: "RGB(204, 204, 204)"}} className={styles.hover} /></div>);
}


function PrevArrow({ onClick }: NextArrowProps) {
  return <div style={{ display: 'inline-block', position: "relative", top: "420px", left: "30px", zIndex: 10 }} onClick={onClick}><ArrowBackIosNewIcon style={{cursor: "pointer", color: "RGB(204, 204, 204)"}} /></div>;
}


const MainSlider = (
  // props: Props
  ) => {
  const navigate = useNavigate()
  const [ slideCnt, setSlideCnt ] = useState(0)
  const settings = {
    className: "center",
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
    afterChange: function (currentSlide: number) {
      setSlideCnt(currentSlide)
    },
    // centerPadding: "60px",
    // centerMode: true,
  }
  

  return (
    <div>
      <div className={styles.counter} data-content={`${slideCnt} / 5`} style={{content: `${slideCnt} / 5`}}>
        {/* {slideCnt} / 5 */}
        </div>
      <Slider {...settings} className={styles.img}>
        {/* 메인 배너 들어갈 자리 */}
        <div onClick={() => {navigate("/user/4")}}>
          <img src="https://c.tenor.com/LlGsQPi_zsYAAAAd/kurzgesagt-gamma-ray.gif" alt="" />
        </div>
        <div>
          <img src="https://c.tenor.com/LlGsQPi_zsYAAAAd/kurzgesagt-gamma-ray.gif" alt="" />
        </div>
        <div>
          <img src="https://c.tenor.com/LlGsQPi_zsYAAAAd/kurzgesagt-gamma-ray.gif" alt="" />
        </div>
        <div>
          <img src="https://c.tenor.com/LlGsQPi_zsYAAAAd/kurzgesagt-gamma-ray.gif" alt="" />
        </div>
        <div>
          <img src="https://c.tenor.com/LlGsQPi_zsYAAAAd/kurzgesagt-gamma-ray.gif" alt="" />
        </div>
        <div>
          <img src="https://c.tenor.com/LlGsQPi_zsYAAAAd/kurzgesagt-gamma-ray.gif" alt="" />
        </div>
      </Slider>
    </div>
  )
}

export default MainSlider;