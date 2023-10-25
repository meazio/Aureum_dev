import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { reset } from 'app/slices/auth';
import { logout, dummyLogout } from 'app/slices/auth';
import { useLocation } from 'react-router-dom';
import LoginModal from 'app/components/LoginModal/LoginModal';
import 'app/components/Navbar/Navbar.css';
import { AppDispatch } from 'app/store';
import SignUpAgreeModal from 'app/components/SignUpAgreeModal/SignUpAgreeModal';

interface AuthState {
  auth: {
    isLoggedIn: boolean;
    user: any | null;
  };
}

const Navbar = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;
  const isLecturePage = pathname === '/lecture';
  const isSettingPage = pathname === '/settings';
  const isConsultingPage = pathname === '/consulting';
  const isMentorPage = pathname === '/trainer';
  const isMembershipPage = pathname === '/membership';
  const isEventPage = pathname === '/event';

  const { isLoggedIn, user } = useSelector((state: AuthState) => state.auth);
  const name = user?.split('@')[0];

  const [isDummyLoggedIn, setIsDummyLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [savedEmail, setSavedEmail] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const logOut = useCallback(() => {
    dispatch(logout({ refreshToken, accessToken }));
  }, [dispatch, refreshToken, accessToken]);

  // useEffect(() => {
  //   if (!accessToken) {
  //     dispatch(reset());
  //   }
  // }, [dispatch, accessToken]);

  const [isMouseOver, setIsMouseOver] = useState(false);
  const [prevMouseY, setPrevMouseY] = useState(0);

  const enterLink = () => {
    setIsMouseOver(true);
  };

  // const nickname = localStorage.getItem('email')?.split('@')[0];
  const nickname = email?.split('@')[0];

  const leaveLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const navContainerCenter = document.querySelector('.nav-container-center');
    const currentMouseY = e.clientY;
    if (navContainerCenter && currentMouseY > prevMouseY) {
      const isMouseOverParentDiv = navContainerCenter.contains(
        document.activeElement,
      );
      setIsMouseOver(isMouseOverParentDiv);
    }

    setIsMouseOver(false);
  };

  const enterDiv = (e: React.MouseEvent<HTMLDivElement> | null) => {
    setIsMouseOver(true);
    if (e !== null) {
      checkMouseDirection(e);
    }
  };

  const leaveDiv = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentMouseY = e.clientY;
    if (currentMouseY > prevMouseY) {
      setIsMouseOver(true);
    } else {
      setIsMouseOver(false);
    }
    checkMouseDirection(e);
  };

  const checkMouseDirection = (e: React.MouseEvent) => {
    const currentMouseY = e.clientY;
    console.log(currentMouseY, prevMouseY);
    if (currentMouseY > prevMouseY) {
      setIsMouseOver(true);
    } else {
      setIsMouseOver(false);
    }
    setPrevMouseY(currentMouseY);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isAgreeModalOpen, setIsAgreeModalOpen] = useState(false);

  const openAgreeModal = () => {
    setIsAgreeModalOpen(true);
  };

  const closeAgreeModal = () => {
    setIsAgreeModalOpen(false);
  };

  const [isUserBoxOpen, setIsUserBoxOpen] = useState(false);
  const toggleBox = () => {
    setIsUserBoxOpen(!isUserBoxOpen);
  };

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleSubMenuEnter = () => {
    setIsSubMenuOpen(true);
  };

  const handleSubMenuLeave = (e: React.MouseEvent) => {
    setIsSubMenuOpen(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const navContainer = document.querySelector('.nav-container');
    const navContainerBottom =
      navContainer?.getBoundingClientRect()?.bottom || 0;

    const navContainerTop = navContainer?.getBoundingClientRect()?.top || 0;
    const currentMouseY = e.clientY;

    if (prevMouseY !== null) {
      if (currentMouseY < prevMouseY && currentMouseY < navContainerBottom) {
        setIsSubMenuOpen(false);
      } else if (currentMouseY < navContainerTop) {
        setIsSubMenuOpen(false);
      } else {
        setIsSubMenuOpen(true);
      }
    }
    setPrevMouseY(currentMouseY);
  };

  return (
    <>
      <LoginModal
        isOpen={isModalOpen}
        close={closeModal}
        setIsDummyLoggedIn={setIsDummyLoggedIn}
        setEmail={setEmail}
        setSavedEmail={setSavedEmail}
      />
      <SignUpAgreeModal isOpen={isAgreeModalOpen} close={closeAgreeModal} />
      <div className="nav-top">
        <div className="nav-top-left">
          <Link to={'/'} className="navbar-brand">
            <span className="brand-left">Re</span>
            <span className="brand-right">BoAST</span>
          </Link>
          <input type="text" className="search-input" />
          <div className="search-icon">
            <img src="/images/search.png" alt="돋보기" />
          </div>
        </div>
        <div className="nav-top-right">
          {isLoggedIn ? (
            <>
              <div className="nickname" onClick={toggleBox}>
                <img src="/images/user.png" alt="유저 프로필 이미지" />
                <span className="nickname-text">{name}</span>
                <img src="/images/user-down.png" alt="아래 화살표" />
                {isUserBoxOpen && (
                  <div className="user-box">
                    <Link to="/mypage" className="nav-link mypage">
                      마이페이지
                    </Link>
                    <Link
                      to=""
                      className="nav-link logout"
                      onClick={() => dispatch(dummyLogout())}
                      // onClick={logOut}
                    >
                      로그아웃
                    </Link>
                  </div>
                )}
              </div>
              {/* onClick={moveToMyPage} */}
            </>
          ) : (
            <>
              <div className="login" onClick={openModal}>
                로그인
              </div>
              <div className="divider">|</div>
              {/* <Link to="/register" className="register"> */}
              <div className="registerBtn" onClick={openAgreeModal}>
                회원가입
              </div>
              {/* </Link> */}
            </>
          )}

          {/* <div className="tutor" onClick={() => alert('준비중입니다.')}>
            REBOAST 선생님 되는 방법
          </div> */}
        </div>
      </div>
      <nav className="navbar navbar-expand navbar-white">
        {isSubMenuOpen && (
          <div
            className="sub-lecture-container"
            // onMouseEnter={handleSubMenuEnter}
            onMouseLeave={handleSubMenuLeave}
            // onMouseLeave={(e) => leaveDiv(e)}
          >
            <div className="lecture">
              <img
                src="/images/lecture.png"
                alt="강의"
                className="lecture-img"
              />
              <span className="category-title">강의</span>
              <div className="lecture-text">
                온라인 교육 서비스를 <br />
                제공합니다.
              </div>
            </div>
            <div className="foundation">
              <div>
                <span className="category-title">창업</span>
              </div>
              <li className="category-list">코파운더</li>
              <li className="category-list">파운더</li>
            </div>
            <div className="employment">
              <div>
                <span className="category-title">취업</span>
              </div>
              <li className="category-list">프론트엔드</li>
              <li className="category-list">백엔드</li>
              <li className="category-list">데이터 엔지니어</li>
              <li className="category-list">인공지능</li>
            </div>
            <div className="hobby">
              <div>
                <span className="category-title">취미</span>
              </div>
              <li className="category-list">음악</li>
              <li className="category-list">미술</li>
              <li className="category-list">체육</li>
            </div>
            <div className="school-learning">
              <div>
                <span className="category-title">초/중/고 학습</span>
              </div>
              <li className="category-list">국어</li>
              <li className="category-list">영어</li>
              <li className="category-list">수학</li>
              <li className="category-list">과학</li>
              <li className="category-list">제 2 외국어</li>
            </div>
            <div className="university">
              <div>
                <span className="category-title">대학 교육</span>
              </div>
              <li className="category-list">논리적 사고</li>
              <li className="category-list">글쓰기</li>
              <li className="category-list">소통</li>
              <li className="category-list">협업</li>
            </div>
          </div>
        )}

        <div className="nav-container">
          <div className="nav-container-left">
            {/* <div className="menu">
              <img src="/images/menu.png" alt="메뉴" />
              <span>전체보기</span>
            </div> */}
            <div
              className="nav-container-center"
              // onMouseEnter={(e) => enterDiv(e)}
              // onMouseLeave={(e) => leaveDiv(e)}
            >
              <Link
                to={'/lecture'}
                // onMouseLeave={(e) => leaveLink(e)}
                // onMouseEnter={() => enterLink()}
                onMouseEnter={handleSubMenuEnter}
                onMouseMove={handleMouseMove}
                // onMouseLeave={handleSubMenuLeave}
                onMouseLeave={() => setPrevMouseY(0)}
                className={`nav-link lecture-link ${
                  isLecturePage && 'selected'
                }`}
              >
                학습 자료
              </Link>

              {/* <Link
                to="/consulting"
                className={`nav-link ${isConsultingPage && 'selected'}`}
                // onClick={() => alert('준비중입니다.')}
              >
                상담
              </Link> */}

              <Link
                to="/trainer"
                className={`nav-link ${isMentorPage && 'selected'}`}
                // onClick={() => alert('준비중입니다.')}
                // ${isMentorPage && 'selected'}
              >
                멘토 소개
              </Link>
              {/* <Link
                to="#"
                className="nav-link"
                onClick={() => alert('준비중입니다.')}
              >
                커뮤니티
              </Link> */}
              <Link
                to="/membership"
                className={`nav-link ${isMembershipPage && 'selected'}`}
              >
                멤버쉽
              </Link>
              <Link
                to="/event"
                className={`nav-link ${isEventPage && 'selected'}`}
              >
                이벤트
              </Link>
              {/* 
              {isLoggedIn && (
                <Link
                  to={'/settings'}
                  className={`nav-link ${isSettingPage && 'selected'}`}
                >
                  내정보
                </Link>
              )} */}
            </div>
          </div>
          <div className="nav-container-right">
            {/* <div className="user-guide" onClick={() => alert('준비중입니다.')}>
              <span>
                <img src="/images/guide.png" alt="이용자 가이드" />
                이용자 가이드
              </span>
            </div> */}
            {/* <div className="schedule" onClick={() => alert('준비중입니다.')}>
              <span className="star">
                <img src="/images/star.png" alt="내강의 일정" />
                내강의 일정
              </span>
            </div> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
