import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./BeritaSliderStyle.css";

export const BeritaSlider = (props) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="BeritaSlider-wrapper">
      <Carousel
        swipeable={true} // Aktifkan swipe
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={false} // Matikan otomatisasi
        autoPlaySpeed={1500}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        <div className="img">
          <img src="src\assets\Kelerengan.png" alt="" className="img" />
        </div>
        <div className="img">
          <img src="src\assets\Kelerengan.png" alt="" className="img" />
        </div>
        <div className="img">
          <img src="src\assets\Kelerengan.png" alt="" className="img" />
        </div>
        <div className="img">
          <img src="src\assets\Kelerengan.png" alt="" className="img" />
        </div>
      </Carousel>
    </div>
  );
};
