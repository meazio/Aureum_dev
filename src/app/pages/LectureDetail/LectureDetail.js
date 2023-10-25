import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LECTURE_DETAIL_DATA from 'app/data/lectureDetailData';
import LECTURE_CARD_DATA from 'app/data/lectureCardData';
import 'app/pages/LectureDetail/LectureDetail.css';

const LectureDetail = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(LECTURE_CARD_DATA);
  }, []);

  const [likeNum, setLikeNum] = useState(0);
  const isLike = likeNum === 1;

  const toggleLike = () => {
    if (likeNum === 0) {
      setLikeNum(1);
    } else {
      setLikeNum(0);
    }
  };

  const { pathname } = useLocation();
  const id = Number(pathname?.split('lecture/')[1]);
  const lectureDetailInfo = [data.filter((lecture) => lecture.id === id)][0][0];
  const title = lectureDetailInfo?.title;
  const lessonContents = lectureDetailInfo?.lessonContents;
  const mainImage = lectureDetailInfo?.image;

  const handleCopyClipBoard = async () => {
    try {
      if (navigator.clipboard !== undefined) {
        await navigator.clipboard.writeText(
          `https://re-boast-web.vercel.app${pathname}`,
        );
        alert('클립보드에 링크가 복사되었어요.');
        return;
      }
      document.body.execCommand(`https://re-boast-web.vercel.app${pathname}`);
      alert('클립보드에 링크가 복사되었어요.');
    } catch (err) {
      console.log(err);
    }
  };

  const readyAlert = () => {
    alert('현재 개발 중입니다');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const { authorId, authorImage, title, desc, authorName, createdAt } = data;

  return (
    // <div className="article-page">
    //   <div className={css.banner}>
    //     <div className={css['lecture-container']}>
    //       <div className={css['profile-box']}>
    //         <img
    //           className={css['author-profile-img']}
    //           src={authorImage}
    //           alt="강사 프로필 사진"
    //         />
    //         <div className={css['author-box']}>
    //           <div className={css.author}>{authorName}</div>
    //           <div className={css.date}>{createdAt}</div>
    //         </div>
    //       </div>
    //       <div className={css.title}>{title}</div>
    //     </div>
    //   </div>
    //   <div className={css.desc}>{desc}</div>
    //   <hr />
    // </div>

    <div className="edu_box">
      <div className="edu_wrap">
        <div className="quick_box">
          <button className="btn_r--sd text_icon" onClick={readyAlert}>
            <span className="material-icons icon_g"></span>
            일정 등록하기
          </button>
          <button className="btn_r--sd mono_icon" onClick={handleCopyClipBoard}>
            <span className="material-icons">share</span>
          </button>
          <button className={`like-btn mono_icon`} onClick={toggleLike}>
            <span className={`material-icons ${isLike ? 'q_active' : null}`}>
              grade
            </span>
          </button>
        </div>
        <div className="tittle">
          <div
            className="img_area"
            style={{ backgroundImage: `url(${mainImage})` }}
          ></div>
          <div className="text_box">
            <div className="tit_top">
              <p className="made_name"> 백기선</p>
              <p className="user_visitor"> 맘에 들어요👍 + {likeNum} </p>
            </div>
            <div className="tit_middle">
              <h1 className="lecture-title">{title}</h1>
              <p>
                마이크로소프트 개발자가 알려주는 자바스프링(Spring) 완전 정복을
                위해서 작성하는 웹페이지 디자인 최대한 몇글자
              </p>
            </div>
            <div className="tit_bottom">
              <ul>
                <li className="edu_tag--r">Java</li>
                <li className="edu_tag--r">Spring</li>
                <li className="edu_tag--r">Spring Boot</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contents">
          {lessonContents?.map((content) => (
            <img src={content} alt="강의 컨텐츠" key={content} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LectureDetail;
