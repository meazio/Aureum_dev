import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'app/store';
import toolArea from './app/';
import viewBox from './app/pages/viewArea';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// 컨테이너를 기반으로 createRoot 호출
function createRootWithContainer(container) {
  return createRoot(container);
}

// 앱을 렌더링하는 함수
function renderApp(container) {
  const persistor = persistStore(store);

  createRootWithContainer(container).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {container.id === 'toolArea' ? <toolArea /> : <viewBox />}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

// 함수 호출
renderApp(document.getElementById('toolArea'));
renderApp(document.getElementById('viewArea'));