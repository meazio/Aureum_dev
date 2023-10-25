import React, { useState, useEffect } from 'react';
import Consulting from 'app/components/Consulting/Consulting';
import CONSULTING_DATA from 'app/data/consultingData';
import 'app/pages/ConsultingPage/ConsultingPage.css';
import ConsultingCard from 'app/components/ConsultingCard/ConsultingCard';

interface ConsultingData {
  id: number;
  authorId: number;
  author: string;
  profileImage: string;
  title: string;
  content: string;
  date: string;
  like: number;
  tags: string[];
  solved: boolean;
}

const ConsultingPage = () => {
  const [data, setData] = useState<ConsultingData[] | null>(null);

  useEffect(() => {
    setData(CONSULTING_DATA);
  }, []);

  if (!data) {
    return null;
  }

  return (
    // <div className="home-page">
    //   {data.map((consulting) => (
    //     <ConsultingCard key={consulting.id} consulting={consulting} />
    //   ))}
    // </div>
    <div className="home-page">
      <div className="consulting-container">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a href="" target="" className="active nav-link">
                    전체
                  </a>
                </li>
                <li className="nav-item">
                  <a href="" target="" className="nav-link">
                    해결
                  </a>
                </li>
                <li className="nav-item">
                  <a href="" target="" className="nav-link">
                    미해결
                  </a>
                </li>
              </ul>
            </div>
            <div>
              {data.map((consulting) => (
                <ConsultingCard key={consulting.id} consulting={consulting} />
              ))}

              <nav>
                <ul className="pagination">
                  <li className="page-item active">
                    <a className="page-link" href="">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      4
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      5
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      6
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      7
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      8
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      9
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      10
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      11
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      12
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      13
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      14
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      15
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      16
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      17
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      18
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      19
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="">
                      20
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="col-md-3">
            <div className="sidebar">
              <p>인기 태그</p>
              <div className="tag-list">
                <a className="tag-pill tag-default" href="#/tag/welcome">
                  welcome
                </a>
                <a
                  className="tag-pill tag-default"
                  href="#/tag/implementations"
                >
                  implementations
                </a>
                <a className="tag-pill tag-default" href="#/tag/introduction">
                  introduction
                </a>
                <a className="tag-pill tag-default" href="#/tag/codebaseShow">
                  codebaseShow
                </a>
                <a className="tag-pill tag-default" href="#/tag/ipsum">
                  ipsum
                </a>
                <a className="tag-pill tag-default" href="#/tag/qui">
                  qui
                </a>
                <a className="tag-pill tag-default" href="#/tag/et">
                  et
                </a>
                <a className="tag-pill tag-default" href="#/tag/cupiditate">
                  cupiditate
                </a>
                <a className="tag-pill tag-default" href="#/tag/quia">
                  quia
                </a>
                <a className="tag-pill tag-default" href="#/tag/deserunt">
                  deserunt
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultingPage;
