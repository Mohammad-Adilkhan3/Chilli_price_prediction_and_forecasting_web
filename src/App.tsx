import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { DatasetProvider } from '@/contexts/DatasetContext';
import routes from './routes';
import Header from '@/components/common/Header';

const App: React.FC = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <DatasetProvider>
        <Toaster />
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    element={route.element}
                  />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </DatasetProvider>
    </ThemeProvider>
  );
};

export default App;
