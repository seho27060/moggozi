import React from "react";
import Slider from "react-slick";
import { Props } from "./Slider";

const AutoPlaySlider = (props: Props) => {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: "linear",
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
