import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '@/styles/index.css';
import { App } from '@/App.tsx';
import { AppLoader } from '@/components/common/app-loader.tsx';
import { PageTitleProvider } from '@/providers/page-title-provider.tsx';
import { ThemeProvider } from '@/providers/theme-provider.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <PageTitleProvider>
        <Suspense fallback={<AppLoader />}>
          <App />
        </Suspense>
      </PageTitleProvider>
    </ThemeProvider>
  </StrictMode>
);
