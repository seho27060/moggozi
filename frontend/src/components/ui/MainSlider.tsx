import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Slider from "react-slick";



import banner1 from "../../asset/banner/001.png"
import banner2 from "../../asset/banner/002.png"
import banner3 from "../../asset/banner/003.png"
import banner4 from "../../asset/banner/004.png"
import banner5 from "../../asset/banner/005.png"
import styles from "./MainSlider.module.scss"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// interface Props {
//   children: React.ReactNode;
// }

interface NextArrowProps {
  // className?: any;
  // style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

function NextArrow({ onClick }: NextArrowProps) {
  return (<div style={{ display: 'inline-block', position: "relative", bottom: "63px", left: "110px" }} onClick={onClick}><ArrowForwardIosIcon style={{cursor: "pointer", color: "RGB(204, 204, 204)"}} className={styles.hover} /></div>);
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
      <div className={styles.counter} data-content={`${slideCnt + 1} / 5`} style={{content: `${slideCnt} / 5`}}>
        {/* {slideCnt} / 5 */}
        </div>
      <Slider {...settings} className={styles.img}>
        {/* 메인 배너 들어갈 자리 */}
        <div onClick={() => {navigate("/user/4")}}>
          <img src={banner1} alt="" />
        </div>
        <div>
          <img src={banner2} alt="" />
        </div>
        <div>
          <img src={banner3} alt="" />
        </div>
        <a href="https://forms.gle/YsrpxDNKo9ZiYbmH9" target="_blank" rel="noopener noreferrer">
          <img src={banner4} alt="" />
        </a>
        <div>
          <img src={banner5} alt="" />
        </div>
      </Slider>
    </div>
  )
}

export default MainSlider;