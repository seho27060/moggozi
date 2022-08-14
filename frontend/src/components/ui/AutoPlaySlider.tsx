import React from "react";
import Slider from "react-slick";
import { Props } from "./Slider";

interface autoProps extends Props{
  rtl:number
}
const AutoPlaySlider = (props: autoProps) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    rtl:(props.rtl === 0 ? true : false)
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
