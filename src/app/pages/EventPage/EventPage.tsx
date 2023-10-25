import React from 'react';

const EventPage = () => {
  return (
    <main id="main">
      <div className="breadcrumbs" data-aos="fade-in">
        <div className="">
          <h2>Events</h2>
          <p>온/오프라인 내부/외부 세미나 </p>
        </div>
      </div>

      <section id="events" className="events">
        <div className="event-container" data-aos="fade-up">
          <div className="row">
            <div className="col-md-6 d-flex align-items-stretch">
              <div className="event-card">
                <div className="event-card-img">
                  <img src="assets/img/events-1.jpg" alt="..." />
                </div>
                <div className="event-card-body">
                  <h5 className="event-card-title">
                    <a href="">Introduction to ChatGPT(오프라인)</a>
                  </h5>
                  <p className="fst-italic text-center">
                    4/10(월) 흑산고등학교 오전 9~10(2HR){' '}
                  </p>
                  <p className="event-card-text">
                    진로를 고민하는 고등학생도 ChatGPT를 활용하여 앞으로 어떤
                    역량을 갖춰야 하는지 설명해주는 오프라인 세미나
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-stretch">
              <div className="event-card">
                <div className="event-card-img">
                  <img src="assets/img/events-2.jpg" alt="..." />
                </div>
                <div className="event-card-body">
                  <h5 className="event-card-title">
                    <a href="">Marketing Strategies(온라인)</a>
                  </h5>
                  <p className="fst-italic text-center">미정</p>
                  <p className="event-card-text">
                    1인 셀러를 위하여 ChatGPT로 변화된 인터넷 쇼핑시장에서
                    신규시장 선점하기
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventPage;
