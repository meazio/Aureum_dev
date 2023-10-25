import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import css from 'app/components/SlideBanner/SlideBanner.module.css';

const SlideBanner: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderRef = useRef<Slider>(null);

  const goToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(slideIndex);
    }
  };

  const customDot = (index: number) => (
    <div className={css['custom-dot-container']}>
      <button
        className={`${css['custom-dot']} ${
          activeSlide === index ? css['active'] : ''
        }`}
        onClick={() => goToSlide(index)}
      />
    </div>
  );

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_: number, next: number) => {
      setActiveSlide(next);
    },
    customPaging: (i: number) => customDot(i),
  };

  const firstTab = activeSlide === 0;
  const secondTab = activeSlide === 1;
  const thirdTab = activeSlide === 2;

  return (
    <div className={css['slider-container']}>
      <Slider {...settings} ref={sliderRef}>
        <div className={css['banner']}>
          <div className={css['container']}>
            <div className={css['custom-dot-container']}>
              {customDot(0)}
              {customDot(1)}
              {customDot(2)}
            </div>
            <div className={css['banner-box']}>
              <div className={css['banner-category']}>
                생애주기 별 맞춤형 교육과정
              </div>
              아이부터 할아버지까지
              <br /> 삶에 필요한 개인 맞춤형 학습컨텐츠
              <div>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickPrev()}
                  className={`${css['control-button']} ${css['prev-button']}`}
                >
                  <img src="/images/slide-left.png" alt="이전" />
                </button>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickPause()}
                  className={`${css['control-button']} ${css['pause-button']}`}
                >
                  <img src="/images/stop.png" alt="정지" />
                </button>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickNext()}
                  className={`${css['control-button']} ${css['next-button']}`}
                >
                  <img src="/images/slide-right.png" alt="다음" />
                </button>
              </div>
            </div>

            <div className={css['banner-box']}>
              <img
                className={css['banner-image']}
                src="/images/banner.png"
                alt="배너 이미지"
              />
            </div>
          </div>
        </div>

        <div className={css['banner']}>
          <div className={css['container']}>
            <div className={css['custom-dot-container']}>
              {customDot(0)}
              {customDot(1)}
              {customDot(2)}
            </div>
            <div className={css['banner-box']}>
              <div className={css['banner-category']}>
                친구들과 함께 즐기는 놀이터
              </div>
              비슷한 관심사를 서로 공유하여
              <br /> 더 재밌는 결과를 만드는 동아리
              <div>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickPrev()}
                  className={`${css['control-button']} ${css['prev-button']}`}
                >
                  <img src="/images/slide-left.png" alt="이전" />
                </button>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickPause()}
                  className={`${css['control-button']} ${css['pause-button']}`}
                >
                  <img src="/images/stop.png" alt="정지" />
                </button>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickNext()}
                  className={`${css['control-button']} ${css['next-button']}`}
                >
                  <img src="/images/slide-right.png" alt="다음" />
                </button>
              </div>
            </div>

            <div className={css['banner-box']}>
              <img
                className={css['banner-image']}
                src="/images/banner.png"
                alt="배너 이미지"
              />
            </div>
          </div>
        </div>
        <div className={css['banner']}>
          <div className={css['container']}>
            <div className={css['custom-dot-container']}>
              {customDot(0)}
              {customDot(1)}
              {customDot(2)}
            </div>
            <div className={css['banner-box']}>
              <div className={css['banner-category']}>
                전문가의 트레이닝 및 코칭
              </div>
              도메인 전문가의 도움을
              <br /> 온/ 오프라인에서 받을 수 있는 멘토
              <div>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickPrev()}
                  className={`${css['control-button']} ${css['prev-button']}`}
                >
                  <img src="/images/slide-left.png" alt="이전" />
                </button>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickPause()}
                  className={`${css['control-button']} ${css['pause-button']}`}
                >
                  <img src="/images/stop.png" alt="정지" />
                </button>
                <button
                  onClick={() => sliderRef && sliderRef.current?.slickNext()}
                  className={`${css['control-button']} ${css['next-button']}`}
                >
                  <img src="/images/slide-right.png" alt="다음" />
                </button>
              </div>
            </div>
            <div className={css['banner-box']}>
              <img
                className={css['banner-image']}
                src="/images/banner.png"
                alt="배너 이미지"
              />
            </div>
          </div>
        </div>
      </Slider>

      {/* <div className={css['sub-nav']}>
        <div
          className={`${css['tab']} ${firstTab && css['selected']}`}
          onClick={() => goToSlide(0)}
        >
          생애주기 별 맞춤형 교육과정
        </div>
        <div
          className={`${css['tab']} ${secondTab && css['selected']}`}
          onClick={() => goToSlide(1)}
        >
          친구들과 함께 즐기는 놀이터
        </div>
        <div
          className={`${css['tab']} ${thirdTab && css['selected']}`}
          onClick={() => goToSlide(2)}
        >
          전문가의 트레이닝 및 코칭
        </div>
      </div> */}
    </div>
  );
};

export default SlideBanner;
