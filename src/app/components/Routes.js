import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Register from 'app/pages/Register/Register';
import Home from 'app/pages/Home/Home';
import Settings from 'app/pages/Settings/Settings';
import LectureDetail from 'app/pages/LectureDetail/LectureDetail';
import ConsultingDetail from 'app/pages/ConsultingDetail/ConsultingDetail';
import MentorPage from 'app/pages/MentorPage/MentorPage';
import MentorDetail from 'app/pages/MentorDetail/MentorDetail';
import FindId from 'app/pages/FindId/FindId';
import FindPassword from 'app/pages/FindPassword/FindPassword';
import LecturePage from 'app/pages/LecturePage/LecturePage';
import Sitemap from 'app/pages/Sitemap/Sitemap.tsx';
import TrainerPage from 'app/pages/TrainerPage/TrainerPage.tsx';
import MembershipPage from 'app/pages/MembershipPage/MembershipPage.tsx';
import EventPage from 'app/pages/EventPage/EventPage.tsx';
import MyPage from 'app/pages/MyPage/MyPage.tsx';

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/lecture" element={<LecturePage />} />
      {/* <Route path="/consulting" element={<ConsultingPage />} /> */}
      <Route path="/mentor" element={<MentorPage />} />
      <Route path="/trainer" element={<TrainerPage />} />
      <Route path="/membership" element={<MembershipPage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/mentor/:id" element={<MentorDetail />} />
      <Route path="/consulting/:id" element={<ConsultingDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/lecture/:id" element={<LectureDetail />} />
      <Route path="/findId" element={<FindId />} />
      <Route path="/findPw" element={<FindPassword />} />
      <Route path="/sitemap" element={<Sitemap />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  );
};

export default MainRouter;
