import React from "react";
import Slider from "react-slick";
import { Props } from "./Slider";

interface autoProps extends Props{
  rtl:number
}
const AutoPlaySlider = (props: autoProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    speed: 6000,
    autoplaySpeed: 0,
    cssEase: "linear",
    rtl:(props.rtl % 2 === 1 ? true : false)
  };

  return (
    <div>
      <Slider {...settings} >
        {props.children}
      </Slider>
    </div>
  );
};

export default AutoPlaySlider;
