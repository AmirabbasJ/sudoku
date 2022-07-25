import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { BoardCtxProvider } from './context/BoardCtx';
import { DraftCtxProvider } from './context/DraftCtx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DraftCtxProvider>
      <BoardCtxProvider>
        <App />
      </BoardCtxProvider>
    </DraftCtxProvider>
  </React.StrictMode>,
);
