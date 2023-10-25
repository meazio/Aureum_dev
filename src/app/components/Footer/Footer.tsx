import React, { ChangeEvent, useState } from 'react';
import 'app/components/Footer/Footer.css';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const showAlert = () => {
    alert('준비중 입니다.');
  };

  const goToSite = (url: string) => {
    window.location.href = url;
  };

  const [site, setSite] = useState('');

  const onChangeSite = (e: ChangeEvent<HTMLSelectElement>) => {
    setSite(e.target.value);
  };

  const handleExternalLinkClick = () => {
    // Update the URL without refreshing the page
    alert(1);
    window.history.pushState(
      null,
      'https://www.naver.com',
      'https://www.naver.com',
    );

    // Trigger a navigation event
    window.dispatchEvent(new Event('popstate'));
  };

  const navigateToExternalLink = (url: string) => {
    window.location.href = url;
  };

  const handleClick = () => {
    const newUrl = 'https://re-boast-web.vercel.app/';

    // Use the History API to update the URL without refreshing the page
    window.history.pushState(null, '', newUrl);

    // Dispatch a new PopStateEvent to let React Router (if used) know about the change
    const popStateEvent = new PopStateEvent('popstate');
    window.dispatchEvent(popStateEvent);
  };

  return (
    <footer className="footer">
      <div className="footerWrap">
        <div className="footer_inner">
          <div className="footer_left">
            {/* <div className="footer_topTxt">
              <Link to="" className="txt_blue" onClick={showAlert}>
                개인정보처리방침
              </Link>
              <Link to="/sitemap">사이트맵</Link>
              <Link to="" onClick={showAlert}>
                웹접근성정책
              </Link>
              <Link to="" onClick={showAlert}>
                뷰어모음 다운로드
              </Link>
            </div> */}
            <div className="footer_botTxt">
              <p className="footer-address">
                14786 경기 부천시 양지로 229 골든IT타워 332호 데이터스
              </p>
              <p className="copyright">copyright @ </p>
            </div>
          </div>
          {/* <div className="footer_right">
            <div className="logo_list">
              <Link
                to="#"
                onClick={() =>
                  navigateToExternalLink('http://www.dataus.co.kr/')
                }
              >
                <img
                  src="https://github.com/yoonhyochang/yoonhyochang/blob/main/%EB%8D%B0%EC%9D%B4%ED%84%B0%EC%8A%A4.png?raw=true"
                  alt="dataus"
                />
              </Link>
              <Link to="#" onClick={handleClick}>
                <img
                  src="https://github.com/yoonhyochang/yoonhyochang/blob/main/%EB%A6%AC%EB%B6%80%EC%8A%A4%ED%8A%B8.png?raw=true"
                  alt="reboast"
                />
              </Link>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
