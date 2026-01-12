import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChipPlayground } from './ChipPlayground';
import { CellPlayground } from './CellPlayground';
import { SearchInputPlayground } from './SearchInputPlayground';
import { PageActionPlayground } from './PageActionPlayground';
import { FeedbackCardPlayground } from './FeedbackCardPlayground';
import { NavigationBarPlayground } from './NavigationBarPlayground';
import { DropdownPlayground } from './DropdownPlayground';
import { ButtonPlayground } from './ButtonPlayground';
import { VerticalMarkerPlayground } from './VerticalMarkerPlayground';
import { BarGraphPlayground } from './BarGraphPlayground';
import { MainFeedbackPage } from './pages/MainFeedbackPage';
import { SkillPage } from './pages/SkillPage';
import './App.css';

type PlaygroundTab = 'chip' | 'cell' | 'search' | 'pageaction' | 'feedbackcard' | 'navigationbar' | 'dropdown' | 'button' | 'verticalmarker' | 'bargraph' | 'mainfeedback';

const PlaygroundApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('chip');

  const tabs = [
    { id: 'chip' as PlaygroundTab, label: 'Chip', component: ChipPlayground },
    { id: 'cell' as PlaygroundTab, label: 'Cell', component: CellPlayground },
    { id: 'search' as PlaygroundTab, label: 'SearchInput', component: SearchInputPlayground },
    { id: 'pageaction' as PlaygroundTab, label: 'PageAction', component: PageActionPlayground },
    { id: 'feedbackcard' as PlaygroundTab, label: 'FeedbackCard', component: FeedbackCardPlayground },
    { id: 'navigationbar' as PlaygroundTab, label: 'NavigationBar', component: NavigationBarPlayground },
    { id: 'dropdown' as PlaygroundTab, label: 'Dropdown', component: DropdownPlayground },
    { id: 'button' as PlaygroundTab, label: 'Button', component: ButtonPlayground },
    { id: 'verticalmarker' as PlaygroundTab, label: 'VerticalMarker', component: VerticalMarkerPlayground },
    { id: 'bargraph' as PlaygroundTab, label: 'BarGraph', component: BarGraphPlayground },
    { id: 'mainfeedback' as PlaygroundTab, label: 'Main Feedback Page', component: MainFeedbackPage },
  ];

  const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component || ChipPlayground;
  const isMainFeedback = activeTab === 'mainfeedback';

  return (
    <div className="app">
      {!isMainFeedback && (
        <header className="app-header">
          <h1 className="app-title">Design System Component Playground</h1>
          <nav className="app-nav">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`app-nav-button ${activeTab === tab.id ? 'app-nav-button--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </header>
      )}
      <main className={`app-main ${isMainFeedback ? 'app-main--full-page' : ''}`}>
        <ActiveComponent />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/playground/*" element={<PlaygroundApp />} />
        <Route path="/skill/:skillId" element={<SkillPage />} />
        <Route path="/" element={<MainFeedbackPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;

