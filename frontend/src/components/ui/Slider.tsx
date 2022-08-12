import React, { Component } from "react";
import Slider from "react-slick";


import styles from "./Slider.module.scss"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface Props {
  children: React.ReactNode;
}


interface NextArrowProps {
  // className?: any;
  // style?: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

// function NextArrow({ className, style, onClick }: NextArrowProps) {
//   return (<div className={className} style={{ ...style, display: 'block', background: 'red', right: "10px", }} onClick={onClick}><img src="https://via.placeholder.com/500x350/" alt="" /></div>);
// }
function NextArrow({ onClick }: NextArrowProps) {
  return (<div style={{ display: 'inline-block', position: "relative", bottom: "190px", left: "470px" }} onClick={onClick}><ArrowForwardIosIcon style={{cursor: "pointer", color: "RGB(204, 204, 204)"}} className={styles.hover} /></div>);
}


function PrevArrow({ onClick }: NextArrowProps) {
  return <div style={{ display: 'inline-block', position: "relative", top: "190px", left: "5px", zIndex: 10 }} onClick={onClick}><ArrowBackIosNewIcon style={{cursor: "pointer", color: "RGB(204, 204, 204)"}} /></div>;
}


const Carousel = (props: Props) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow/>,
  }
  

  return (
    <div style={{width: "500px", height: "350px"}}>
      <Slider {...settings}>
        {props.children}
      </Slider>
    </div>
  )


}

export default Carousel;