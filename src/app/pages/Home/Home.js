import React, { useEffect, useState } from 'react';
import UserService from 'app/services/user.service';
import { useSelector } from 'react-redux';
import 'app/pages/Home/Home.css';
import Tags from 'app/components/Tags/Tags';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SlideBanner from 'app/components/SlideBanner/SlideBanner';
import { Link } from 'react-router-dom';
import LectureCard from 'app/components/LectureCard/LectureCard.tsx';
import LectureCardData from 'app/data/lectureCardData.ts';
import SignUpAgreeModal from 'app/components/SignUpAgreeModal/SignUpAgreeModal';
import useWindowSize from 'app/hooks/useWindowSize';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('username');
  const [cardData, setCardData] = useState([]);
  const [hotCardData, setHotCardData] = useState([]);
  const [newCardData, setNewCardData] = useState([]);

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && isLoggedIn) {
      UserService.getUserProfile(accessToken)
        .then((response) => {
          if (response.status === 200) {
            const { username } = response.data;
            if (!userName) {
              localStorage.setItem('username', username);
            }
          }
        })
        .catch(() => {
          window.location.reload();
        });
    }
  }, [userName, accessToken, isLoggedIn]);

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr?.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const convertToDate = (dateString) => new Date(dateString);

  const { width } = useWindowSize();

  const cardNum = () => {
    if (width < 1382 && width >= 1160) return 3;
    else if (width < 1160 && width >= 821) return 2;
    else if (width < 821) return 1;
    else return 4;
  };

  const newSlides = chunkArray(
    cardData
      .sort((a, b) => convertToDate(b.date) - convertToDate(a.date))
      .slice(0, 8),
    cardNum(),
  );

  const hotSlides = chunkArray(
    cardData.sort((a, b) => b.rate - a.rate).slice(0, 8),
    cardNum(),
  );

  useEffect(() => {
    setCardData(LectureCardData);
    setHotCardData(hotSlides);
    setNewCardData(newSlides);
  }, [width]);

  const slideToShow = () => {
    if (width >= 900) return 3.1;
    if (width < 900 && width >= 700) return 2.6;
    if (width < 700 && width >= 570) return 2.1;
    if (width < 570) return 1.1;
  };

  const [disableClick, setDisableClick] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slideToShow(),
    slidesToScroll: 1,
    beforeChange: (currentSlide, nextSlide) => {
      setDisableClick(true);
    },
    afterChange: (currentSlide, nextSlide) => {
      setDisableClick(false);
    },
    prevArrow: null,
    nextArrow: null,
  };

  return (
    <div className="home">
      <SlideBanner />
      <SignUpAgreeModal />
      <div className="statistics">
        <div className="left-box">
          <div className="learning-guide">학습 가이드</div>
          <div className="slogan">
            <div>당신의 꿈은 무엇입니까?</div>
            <div>공부를 왜 하나요?</div>
          </div>
          <div className="slogan-kr">
            미련하게 배우는 시대는 갔습니다. 스마트하게 인공지능 리터러시를
            키워야 합니다.
          </div>
        </div>
        <div className="right-box">
          <div className="right-box-item">
            <div className="num">1232</div>
            <div className="text">Founder</div>
          </div>
          <div className="right-box-item">
            <div className="num">42</div>
            <div className="text">Events</div>
          </div>
          <div className="right-box-item">
            <div className="num">64</div>
            <div className="text">Courses</div>
          </div>
          <div className="right-box-item">
            <div className="num">15</div>
            <div className="text">Trainers</div>
          </div>
        </div>
      </div>

      {/* <div className="guide">
        <div className="category-box">
          <div className="learning-order">내게 맞는 학습 순서</div>
          <div>
            <div>
              <img src="/images/wallet.png" alt="창업" />
            </div>
            <div className="category-text">창업</div>
          </div>
          <div>
            <div>
              <img src="/images/enterprise.png" alt="취업" />
            </div>
            <div className="category-text">취업</div>
          </div>
          <div>
            <div>
              <img src="/images/hobby.png" alt="취미" />
            </div>
            <div className="category-text">취미</div>
          </div>
          <div>
            <div>
              <img src="/images/book.png" alt="학습" />
            </div>
            <div className="category-text">학습</div>
          </div>
        </div>
      </div> */}

      {/* <Tags /> */}

      {/* <div className="apply-tutor">
        <div className="apply-tutor-text">
          선생님이 되면
          <br /> <b>다양한 혜택</b>들이 기다리고 있어요
        </div>
        <div className="apply">선생님 신청하기</div>
      </div> */}

      <div className="hot-lecture">
        <div className="hot">오늘의 Hot 한 강의 🔥</div>
        <div className="hot-lecture-text">
          매일 오전 12시마다 Learning Friends 조회수가 많은 강의들로 갱신됩니다
        </div>
        <div className="hot-lecture-box">
          <Link to={'/lecture'} state={{ filter: 'hot' }}>
            <img
              className="arrow-right"
              src="/images/arrowRight.png"
              alt="강의 리스트 페이지로 이동하는 버튼"
            />
          </Link>
        </div>

        {width >= 1024 ? (
          <Carousel
            interval={null}
            nextIcon={<img src="/images/chevronRight.png" alt="다음 버튼" />}
            prevIcon={<img src="/images/chevronLeft.png" alt="이전 버튼" />}
          >
            {hotCardData.map((slide, index) => (
              <Carousel.Item key={index} className="carousel-item">
                <div className="lecture-num">
                  {index + 1}/{hotSlides?.length}
                </div>

                <Row>
                  {slide.map((card) => (
                    <Col key={card.id} className="col">
                      <LectureCard key={card.id} card={card} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Slider {...settings}>
            {cardData
              .sort((a, b) => b.rate - a.rate)
              .slice(0, 8)
              .map((card) => (
                <LectureCard
                  key={card.id}
                  card={card}
                  disableClick={disableClick}
                />
              ))}
          </Slider>
        )}
      </div>

      <div className="new-lecture">
        <div className="new">새롭게 준비된 강의 🎁</div>
        <div className="new-lecture-text">
          6시간 마다 새롭게 준비된 강의를 추천해 드립니다
        </div>
        <div className="new-lecture-box">
          <Link to={'/lecture'} state={{ filter: 'new' }}>
            <img
              className="arrow-right"
              src="/images/arrowRight.png"
              alt="강의 리스트 페이지로 이동하는 버튼"
            />
          </Link>
        </div>

        {width >= 1024 ? (
          <Carousel
            interval={null}
            nextIcon={<img src="/images/chevronRight.png" alt="다음 버튼" />}
            prevIcon={<img src="/images/chevronLeft.png" alt="이전 버튼" />}
          >
            {newCardData.map((slide, index) => (
              <Carousel.Item key={index} className="carousel-item">
                <div className="lecture-num">
                  {index + 1}/{newSlides?.length}
                </div>

                <Row>
                  {slide.map((card) => (
                    <Col key={card.id} className="col">
                      <LectureCard key={card.id} card={card} />
                    </Col>
                  ))}
                </Row>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Slider {...settings}>
            {cardData
              .sort((a, b) => convertToDate(b.date) - convertToDate(a.date))
              .slice(0, 8)
              .map((card) => (
                <LectureCard
                  key={card.id}
                  card={card}
                  disableClick={disableClick}
                />
              ))}
          </Slider>
        )}
      </div>

      {/* <div className="mentoring-board">
        <div className="hot">Hot</div>
        <div className="mentoring-text">멘토링 게시판</div>
        <div className="last-week-best">최근 일주일 동안 많이 찾은 강의</div>
        <div className="card-deck">
          <DummyCard />
          <DummyCard />
          <DummyCard />
          <DummyCard />
        </div>
      </div> */}
    </div>
  );
};

export default Home;
