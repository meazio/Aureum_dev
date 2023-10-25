import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import './SlideWithControls.css'; // 스타일링을 위한 CSS 파일

interface SlideItem {
  imageSrc: string;
  caption: string;
}

const SlideItem = ({ imageSrc, caption }: SlideItem) => (
  <div className="slide-item">
    <img src={imageSrc} alt={caption} />
    <p className="caption">{caption}</p>
  </div>
);

const SlideWithControls = () => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const [isSliderReady, setIsSliderReady] = useState(false);

  const slideData = [
    {
      imageSrc: '/images/banner.png',
      caption: '이미지 1 설명',
    },
    {
      imageSrc: '/images/banner.png',
      caption: '이미지 2 설명',
    },
    {
      imageSrc: '/images/banner.png',
      caption: '이미지 3 설명',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // beforeChange: (current, next) => {
    //   // 슬라이드 변경되기 전의 동작을 정의할 수 있습니다.
    // },
    afterChange: () => {
      setIsSliderReady(true); // 슬라이더가 변경된 후에 준비 완료 상태로 설정
    },
  };

  return (
    <div className="slide-container">
      <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
        {slideData.map((slide, index) => (
          <SlideItem
            key={index}
            imageSrc={slide.imageSrc}
            caption={slide.caption}
          />
        ))}
      </Slider>
      <div className="slide-controls">
        <button
          onClick={() => sliderRef && sliderRef.slickPrev()}
          className="control-button prev-button"
          disabled={!isSliderReady}
        >
          이전
        </button>
        <button
          onClick={() => sliderRef && sliderRef.slickNext()}
          className="control-button next-button"
          disabled={!isSliderReady}
        >
          다음
        </button>
        <button
          onClick={() => sliderRef && sliderRef.slickPause()}
          className="control-button pause-button"
          disabled={!isSliderReady}
        >
          정지
        </button>
      </div>
    </div>
  );
};

export default SlideWithControls;
