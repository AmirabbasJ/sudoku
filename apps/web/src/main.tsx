import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import { BoardCtxProvider } from './context/BoardCtx';
import { DraftCtxProvider } from './context/DraftCtx';
import { GameStateCtxProvider } from './context/GameStateCtx';
import { ThemeCtxProvider } from './context/ThemeCtx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeCtxProvider>
        <GameStateCtxProvider>
          <DraftCtxProvider>
            <BoardCtxProvider>
              <App />
            </BoardCtxProvider>
          </DraftCtxProvider>
        </GameStateCtxProvider>
      </ThemeCtxProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
