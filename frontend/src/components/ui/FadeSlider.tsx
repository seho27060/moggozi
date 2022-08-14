import React from "react";
import Slider from "react-slick";

interface Props {
  children: React.ReactNode;
}

const FadeSlider = (props: Props) => {
  const settings = {
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
    <Slider {...settings}>
      {props.children}
    </Slider>
  </div>
  )
}

export default FadeSlider;