import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { BoardCtxProvider } from './context/BoardCtx';
import { DraftCtxProvider } from './context/DraftCtx';
import { ThemeCtxProvider } from './context/ThemeCtx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeCtxProvider>
      <DraftCtxProvider>
        <BoardCtxProvider>
          <App />
        </BoardCtxProvider>
      </DraftCtxProvider>
    </ThemeCtxProvider>
  </React.StrictMode>,
);
