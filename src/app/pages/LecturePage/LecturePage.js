import React, { useState, useEffect } from 'react';
import UserService from 'app/services/user.service';
import Lecture from 'app/components/Lecture/Lecture';
import LECTURE_CARD_DATA from 'app/data/lectureCardData';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import LectureCard from 'app/components/LectureCard/LectureCard.tsx';
import 'app/pages/LecturePage/LecturePage.css';
import CategorySearchBar from 'app/components/CategorySearchBar/CategorySearchBar.tsx';
import CategorySideBar from 'app/components/CategorySideBar/CategorySideBar.tsx';
import CATEGORY_DATA from 'app/data/categoryData.ts';
import HotTag from 'app/components/HotTag/HotTag.tsx';
import ScrollToTopButton from 'app/components/ScrollToTopButton/ScrollToTopButton.tsx';

const LecturePage = () => {
  const accessToken = localStorage.getItem('accessToken');
  const userName = localStorage.getItem('username');

  const [category, setCategory] = useState('창업');
  const [subCategory, setSubCategory] = useState('ALL');

  const { isLoggedIn } = useSelector((state) => state.auth);

  const [searchKeyword, setSearchKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const [checkSearch, setCheckSearch] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (search === false) {
      setData(LECTURE_CARD_DATA);
    }
  }, []);

  useEffect(() => {
    if (search === true && searchKeyword !== '') {
      const searchData = LECTURE_CARD_DATA.filter((lecture) => {
        const { title, tags, category, subCategory, field, author } = lecture;
        const isTitleIncludeKeyword = title.normalize().includes(searchKeyword);
        const isTagsIncludeKeyword = tags.some((tag) => tag === searchKeyword);
        const isCategoryIncludeKeyword = category === searchKeyword;
        const isSubCategoryIncludeKeyword = subCategory === searchKeyword;
        const isFieldIncludeKeyword = field === searchKeyword;
        const isAuthorIncludeKeyword = author === searchKeyword;
        return (
          isTitleIncludeKeyword ||
          isTagsIncludeKeyword ||
          isCategoryIncludeKeyword ||
          isSubCategoryIncludeKeyword ||
          isFieldIncludeKeyword ||
          isAuthorIncludeKeyword
        );
      });
      setCheckSearch(true);
      setData(searchData);
    }
    setSearch(false);
  }, [search]);

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

  const { state } = useLocation();
  const stateFilter = state?.filter;

  const selectList = ['인기순', '최신순', '조회순'];
  const [selected, setSelected] = useState('인기순');

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  const isNewest = selected === '최신순';
  const isByPopularity = selected === '인기순';
  const isByView = selected === '조회순';

  const convertToDate = (dateString) => new Date(dateString);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (stateFilter === 'new') {
      setSelected('최신순');
    }
  }, []);

  return (
    <div className="home-page lecture-home-page">
      <ScrollToTopButton />
      <CategorySideBar
        setCategory={setCategory}
        subCategory={subCategory}
        setSubCategory={setSubCategory}
      />
      <CategorySearchBar
        category={category}
        subCategory={subCategory}
        searchKeyword={searchKeyword}
        setSearch={setSearch}
        setSearchKeyword={setSearchKeyword}
      />
      <div className="hot-trend-box">
        <div className="hot-trend">인기주제트렌드</div>
        <div className="hot-trend-body">
          <div className="hot-trend-desc">
            <span className="highlight">[{category}]</span>에{' '}
            <span className="highlight">[{subCategory}]</span> 중점으로 자주
            검색된 기술 태그들을 보여드립니다
          </div>
          <div className="hot-tag-box">
            <HotTag tag={'Metabolism syndrome'} />
            <HotTag tag={'Fatty acid metabolism'} />
            <HotTag tag={'인공지능'} />
            <HotTag tag={'ESG'} />
            <HotTag tag={'간호대학생'} />
            <HotTag tag={'머신러닝'} />
            <HotTag tag={'자율주행'} />
            <HotTag tag={'메타버스'} />
            <HotTag tag={'분산분석(ANOVA analysis)'} />
            <HotTag tag={'ai'} />
            <HotTag tag={'MBTI'} />
            <HotTag tag={'Metabolic syndrome'} />
            <HotTag tag={'마약'} />
            <HotTag tag={'스마트팜'} />
            <HotTag tag={'chat gpt'} />
            <HotTag tag={'홍범도'} />
          </div>
        </div>
      </div>

      <div className="result-filter-box">
        <div className="search-result">
          {checkSearch && (
            <>
              검색결과가
              <span className="search-highlight">
                &nbsp;{data?.length}건&nbsp;
              </span>
              나왔습니다
            </>
          )}
        </div>
        <div className="filter">
          <select
            onChange={handleSelect}
            value={selected}
            className="filter-select"
          >
            {selectList.map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card-deck lecture-card-deck">
        {isByPopularity &&
          [...data]
            .sort((a, b) => b.rate - a.rate)
            .map((card) => <LectureCard key={card.id} card={card} />)}
        {isNewest &&
          [...data]
            .sort((a, b) => convertToDate(b.date) - convertToDate(a.date))
            .map((card) => <LectureCard key={card.id} card={card} />)}
        {isByView &&
          [...data]
            .sort((a, b) => b.viewCount - a.viewCount)
            .map((card) => <LectureCard key={card.id} card={card} />)}
      </div>
      {/* <Carousel
          nextIcon={<img src="/images/chevronRight.png" alt="다음 버튼" />}
          prevIcon={<img src="/images/chevronLeft.png" alt="이전 버튼" />}
        > */}
      {/* {slides.map((slide, index) => (
          <Carousel.Item key={index} className="carousel-item">
            <Row>
              {slide.map((card) => (
                <Col key={card.id} md={3} className="col">
                  <Card className="carousel-card">
                    <Card.Img
                      className="card-img"
                      variant="top"
                      src={card.image}
                      alt={card.title}
                    />
                    <Card.Body className="card-body">
                      <Card.Title>{card.title}</Card.Title>
                      <Card.Text>{card.content}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))} */}
      {/* </Carousel> */}
      {/* {data.map((lecture) => (
        <Lecture key={lecture.id} lecture={lecture} />
      ))} */}
    </div>
  );
};

export default LecturePage;
