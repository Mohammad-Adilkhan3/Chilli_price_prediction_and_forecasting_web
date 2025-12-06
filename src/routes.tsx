import type { ReactNode } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AIInsights from './pages/AIInsights';
import AIChat from './pages/AIChat';
import AdvancedCharts from './pages/AdvancedCharts';
import ModelIntelligence from './pages/ModelIntelligence';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <LandingPage />,
    visible: true
  },
  {
    name: 'AI Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    visible: true
  },
  {
    name: 'AI Insights',
    path: '/insights',
    element: <AIInsights />,
    visible: true
  },
  {
    name: 'AI Assistant',
    path: '/chat',
    element: <AIChat />,
    visible: true
  },
  {
    name: 'Advanced Charts',
    path: '/charts',
    element: <AdvancedCharts />,
    visible: true
  },
  {
    name: 'Model Intelligence',
    path: '/models',
    element: <ModelIntelligence />,
    visible: true
  }
];

export default routes;
