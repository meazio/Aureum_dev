import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CONSULTING_DATA from 'app/data/consultingData';
// import css from 'app/pages/ConsultingDetail/ConsultingDetail.module.css';
import 'app/pages/ConsultingDetail/ConsultingDetail.css';
interface ConsultingData {
  id: number;
  profileImage: string;
  author: string;
  date: string;
  like: number;
  title: string;
  content: string;
  tags: string[];
}

const ConsultingDetail = () => {
  const { pathname } = useLocation();
  const consultingId = Number(pathname.split('/')[2]);

  const [data, setData] = useState<ConsultingData[]>([]);
  useEffect(() => {
    setData(CONSULTING_DATA);
  }, []);

  const consultingDetailData = [
    data.filter((d) => d.id === consultingId),
  ][0][0];

  if (!data || !consultingDetailData) {
    return null;
  }
  console.log(consultingDetailData);

  const { id, profileImage, author, date, like, title, content, tags } =
    consultingDetailData;

  return (
    <div id="main">
      <div className="article-page">
        <div className="consulting-banner">
          <div className="consulting-box">
            <h1>{title}</h1>
            <div className="article-meta">
              <img src={profileImage} />

              <div className="info">
                {author}
                <span className="date">{date}</span>
              </div>

              <span>
                <button className="btn btn-sm btn-outline-secondary follow-btn">
                  <i className="ion-plus-round"></i> <span> </span>
                  <span>Follow {author}</span>
                </button>
                <button className="btn btn-sm btn-outline-primary favorite-btn">
                  <i className="ion-heart"></i> <span> </span>
                  <span>Favorite Article</span> <span> </span>
                  <span className="counter">{like}</span>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="consulting-detail-container">
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p className="content">{content}</p>
              </div>
              <ul className="tag-list">
                {tags.map((tag) => (
                  <li>
                    <a
                      className="tag-default tag-pill tag-outline"
                      href={`/consulting#/tag/${tag}`}
                    >
                      {tag}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <img src="https://api.realworld.io/images/demo-avatar.png" />

              <div className="info consulting-author-name">
                Anah Benešová
                <span className="date">December 9, 2022</span>
              </div>

              <span>
                <button className="btn btn-sm btn-outline-secondary follow-btn">
                  <i className="ion-plus-round"></i> <span> </span>
                  <span>Follow Anah Benešová</span>
                </button>
                <span> </span>
                <button className="btn btn-sm btn-outline-primary favorite-btn">
                  <i className="ion-heart"></i> <span> </span>
                  <span>Favorite Article</span> <span> </span>
                  <span className="counter">1632</span>
                </button>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <p>
                <a href="/login" className="sign">
                  Sign in
                </a>
                or
                <a href="/register" className="sign">
                  sign up
                </a>
                to add comments on this article.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    // {/* <div className="article-page"> */}
    //   {/* <div className="banner">
    //     <div className="container">
    //       <h1>{title}</h1>
    //       <div className={css['profile-box']}>
    //         <Link to={`/profile/${authorId}`}>
    //           <img
    //             className={css['author-profile-img']}
    //             src={authorImage}
    //             alt="강사 프로필 사진"
    //           />
    //         </Link>
    //         <div className={css['author-box']}>
    //           <Link className="author" to={`/profile/${authorId}`}>
    //             {authorName}
    //           </Link>
    //           <div className="date">{createdAt}</div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="container page">
    //     <div className="row article-content">
    //       <div className="col-xs-12">
    //         <div>{desc}</div>
    //       </div>
    //     </div>
    //     <hr />
    //   </div> */}
    // {/* </div> */}
  );
};

export default ConsultingDetail;
