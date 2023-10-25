import React from 'react';
import css from 'app/pages/MembershipPage/MembershipPage.module.css';

const MembershipPage = () => {
  return (
    <main id="main">
      <div className="breadcrumbs" data-aos="fade-in">
        <div>
          <h2>Pricing</h2>
          <p>개인고객/파트너 </p>
        </div>
      </div>

      <section id="pricing" className={`pricing ${css['pricing-box']}`}>
        <div className="" data-aos="fade-up">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="box">
                <h3>Free</h3>
                <h4>
                  <sup>$</sup>0<span> / month</span>
                </h4>
                <ul>
                  <li>Aida dere</li>
                  <li>Nec feugiat nisl</li>
                  <li>Nulla at volutpat dola</li>
                  <li className="na">Pharetra massa</li>
                  <li className="na">Massa ultricies mi</li>
                </ul>
                <div className="btn-wrap">
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
              <div className="box">
                <h3>학생(초·중·고)</h3>
                <h4>
                  <sup>$</sup>1<span> / month</span>
                </h4>
                <ul>
                  <li>대학생</li>
                  <li>고등학생</li>
                  <li>기초교육</li>
                  <li>Pharetra massa</li>
                  <li className="na">Massa ultricies mi</li>
                </ul>
                <div className="btn-wrap">
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
              <div className="box">
                <h3>대학생</h3>
                <h4>
                  <sup>$</sup>2<span> / month</span>
                </h4>
                <ul>
                  <li>Aida dere</li>
                  <li>Nec feugiat nisl</li>
                  <li>Nulla at volutpat dola</li>
                  <li>Pharetra massa</li>
                  <li>Massa ultricies mi</li>
                </ul>
                <div className="btn-wrap">
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
              <div className="box">
                <span className="advanced">Advanced</span>
                <h3>Ultimate</h3>
                <h4>
                  <sup>$</sup>49<span> / month</span>
                </h4>
                <ul>
                  <li>Aida dere</li>
                  <li>Nec feugiat nisl</li>
                  <li>Nulla at volutpat dola</li>
                  <li>Pharetra massa</li>
                  <li>Massa ultricies mi</li>
                </ul>
                <div className="btn-wrap">
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MembershipPage;
