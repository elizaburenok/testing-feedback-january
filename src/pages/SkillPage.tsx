import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { SearchInput } from '../components/SearchInput';
import { Chip } from '../components/Chip';
import { BarGraph, type BarGraphDataPoint } from '../components/BarGraph';
import { FeedbackCard } from '../components/FeedbackCard';
import { Cell } from '../components/Cell';
import { Dropdown } from '../components/Dropdown';
import { type ProgressLevel } from '../components/VerticalMarker';
import { skillsData, competenciesData } from '../data/skills';
import { feedbackCardsData } from '../data/feedbackCards';
import { filterDropdownItems } from '../data/filterDropdowns';
import '../../tokens/css-variables.css';
import './SkillPage.css';
import successAvatar from '../assets/images/Success-Avatar.svg';

export const SkillPage: React.FC = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ author?: string; period?: string; rating?: string }>({});

  // Ensure page opens scrolled to the top whenever skill changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [skillId]);

  // Find the skill by ID
  const skill = skillsData.find((s) => s.id === skillId);
  const competency = skill ? competenciesData.find((c) => c.id === skill.competencyId) : undefined;

  // Hardcoded average rating for prototype
  const averageRating = 4.2;

  // Filter feedback cards by skill ID
  const skillFeedbackCards = useMemo(() => {
    if (!skillId) return [];
    return feedbackCardsData.filter((card) => card.skillIds.includes(skillId));
  }, [skillId]);


  // Filter feedback cards by search query and rating
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFeedbackCards = skillFeedbackCards.filter((card, index) => {
    // Search query filter
    if (normalizedQuery) {
      const author = card.author.toLowerCase();
      const strengths = card.strengths.toLowerCase();
      const growth = card.growthZone.toLowerCase();
      const matchesSearch =
        author.includes(normalizedQuery) ||
        strengths.includes(normalizedQuery) ||
        growth.includes(normalizedQuery);
      if (!matchesSearch) return false;
    }

    // Rating filter
    if (selectedFilters.rating) {
      // Assign rating based on index (same logic as in render)
      const ratings = ['Хорошо справляется', 'Хорошо справляется', 'Обратить внимание', 'Поработать над этим'];
      const cardRating = ratings[index % ratings.length] || 'Хорошо справляется';
      
      // Map filter labels to card ratings
      // "Хорошо справляется" matches "Хорошо справляется"
      // "Стоит обратить внимание" matches "Обратить внимание" and "Поработать над этим"
      if (selectedFilters.rating === 'Хорошо справляется') {
        if (cardRating !== 'Хорошо справляется') return false;
      } else if (selectedFilters.rating === 'Стоит обратить внимание') {
        if (cardRating === 'Хорошо справляется') return false;
      }
    }

    return true;
  });


  // Generate BarGraph data - 8 bars for months (March to October)
  // For prototype, we'll create 8 data points representing months
  const barGraphData: BarGraphDataPoint[] = useMemo(() => {
    const months = ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь'];
    // Progress levels based on design: 50%, 50%, 60%, 20%, 70%, 70%, 70%, 90%
    const progressLevels: ProgressLevel[] = ['50%', '50%', '60%', '20%', '70%', '70%', '70%', '90%'];
    
    return months.map((month, index) => ({
      label: month,
      progressLevel: progressLevels[index] || '50%',
      size: '44' as const,
      quantity: '1 Bar' as const,
      state: 'Default' as const,
    }));
  }, []);

  // Widget competencies data (similar to MainFeedbackPage)
  const widgetCompetencies = [
    {
      title: competency?.label || 'Компетенция',
      description: 'Средняя оценка',
      status: averageRating >= 4 ? 'success' as const : 'warning' as const,
    },
  ];

  if (!skill) {
    return (
      <div className="skill-page">
        <div className="skill-page__error">
          <h1>Навык не найден</h1>
          <button onClick={() => navigate('/')}>Вернуться на главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-page">
      {/* Top Navigation Bar */}
      <div className="skill-page__top-nav">
        <div className="skill-page__logo">
          <span className="skill-page__logo-text">афина</span>
        </div>
        <div className="skill-page__nav-buttons">
          <button className="skill-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
            </svg>
            <span>Главная</span>
          </button>
          <button className="skill-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H16L14 4H10L8 6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6Z" fill="currentColor" />
            </svg>
            <span>Задачи</span>
          </button>
          <button className="skill-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
            </svg>
            <span>Поиск</span>
          </button>
          <button className="skill-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3C8.03 3 4 7.03 4 12H1L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 20 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor" />
            </svg>
            <span>Сервисы</span>
          </button>
          <button className="skill-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
            </svg>
            <span>Админка</span>
          </button>
        </div>
        <div className="skill-page__user-section">
          <div className="skill-page__user-info">
            <div className="skill-page__avatar">БА</div>
            <span className="skill-page__user-name">Бурлин Александр</span>
          </div>
          <div className="skill-page__user-actions">
            <button className="skill-page__action-icon" aria-label="Face ID">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor" />
              </svg>
            </button>
            <button className="skill-page__action-icon" aria-label="Settings">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.14 11.06L21.16 9.48C21.34 9.33 21.38 9.07 21.24 8.88L19.24 6.12C19.1 5.93 18.84 5.88 18.65 6.02L16.57 7.58C16.11 7.26 15.6 7.01 15.05 6.84L14.79 4.58C14.75 4.3 14.52 4.09 14.24 4.09H9.76C9.48 4.09 9.25 4.3 9.21 4.58L8.95 6.84C8.4 7.01 7.89 7.26 7.43 7.58L5.35 6.02C5.16 5.88 4.9 5.93 4.76 6.12L2.76 8.88C2.62 9.07 2.66 9.33 2.84 9.48L4.86 11.06C4.82 11.36 4.8 11.67 4.8 12C4.8 12.33 4.82 12.64 4.86 12.94L2.84 14.52C2.66 14.67 2.62 14.93 2.76 15.12L4.76 17.88C4.9 18.07 5.16 18.12 5.35 17.98L7.43 16.42C7.89 16.74 8.4 16.99 8.95 17.16L9.21 19.42C9.25 19.7 9.48 19.91 9.76 19.91H14.24C14.52 19.91 14.75 19.7 14.79 19.42L15.05 17.16C15.6 16.99 16.11 16.74 16.57 16.42L18.65 17.98C18.84 18.12 19.1 18.07 19.24 17.88L21.24 15.12C21.38 14.93 21.34 14.67 21.16 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="skill-page__content">
        {/* Header Section */}
        <div className="skill-page__header">
          <h1 className="skill-page__title">{skill.label}</h1>
          <div className="skill-page__search-filters">
            <div className="skill-page__search">
              <SearchInput
                placeholder="Поиск активности или автора"
                size="s"
                variant="filled"
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
            </div>
            <div className="skill-page__filters">
              <div className="skill-page__filter-wrapper">
                <Chip
                  variant="dropdown"
                  label={selectedFilters.author || "Автор"}
                  dropdownOpen={openDropdown === 'author'}
                  onClick={() => setOpenDropdown(openDropdown === 'author' ? null : 'author')}
                />
                {openDropdown === 'author' && (
                  <Dropdown
                    type="list"
                    mode="desktop"
                    items={[]}
                    open={true}
                    onSelect={(item) => {
                      setSelectedFilters({ ...selectedFilters, author: item.label });
                      setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                  />
                )}
              </div>
              <div className="skill-page__filter-wrapper">
                <Chip
                  variant="dropdown"
                  label={selectedFilters.period || "Период"}
                  dropdownOpen={openDropdown === 'period'}
                  onClick={() => setOpenDropdown(openDropdown === 'period' ? null : 'period')}
                />
                {openDropdown === 'period' && (
                  <Dropdown
                    type="list"
                    mode="desktop"
                    items={filterDropdownItems.period}
                    open={true}
                    onSelect={(item) => {
                      setSelectedFilters({ ...selectedFilters, period: item.label });
                      setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                  />
                )}
              </div>
              <div className="skill-page__filter-wrapper">
                <Chip
                  variant="dropdown"
                  label={selectedFilters.rating || "Оценка"}
                  dropdownOpen={openDropdown === 'rating'}
                  selected={!!selectedFilters.rating}
                  showResetIcon={!!selectedFilters.rating}
                  onClick={() => setOpenDropdown(openDropdown === 'rating' ? null : 'rating')}
                  onReset={() => {
                    setSelectedFilters({ ...selectedFilters, rating: undefined });
                    setOpenDropdown(null);
                  }}
                />
                {openDropdown === 'rating' && (
                  <Dropdown
                    type="list"
                    mode="desktop"
                    items={filterDropdownItems.rating}
                    open={true}
                    onSelect={(item) => {
                      setSelectedFilters({ ...selectedFilters, rating: item.label });
                      setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BarGraph Section */}
        {barGraphData.length > 0 && (
          <div className="skill-page__graph">
            <BarGraph
              data={barGraphData}
              yAxisLabels={['Хорошо справляется', 'Обратить внимание', 'Поработать над этим']}
              showGrid={true}
              gridLineCount={3}
            />
          </div>
        )}

        {/* List Section */}
        <div className="skill-page__list">
          {filteredFeedbackCards.length === 0 ? (
            <div className="skill-page__empty">Нет обратной связи для этого навыка</div>
          ) : (
            filteredFeedbackCards.map((card, index) => {
              // For prototype, assign ratings based on index or use a default
              // In real app, this would come from the data
              const ratings = ['Хорошо справляется', 'Хорошо справляется', 'Обратить внимание', 'Поработать над этим'];
              const rating = ratings[index % ratings.length] || 'Хорошо справляется';
              
              return (
                <FeedbackCard
                  key={`${card.author}-${index}`}
                  name={card.name}
                  date={card.date}
                  author={card.author}
                  strengths={card.strengths}
                  growthZone={card.growthZone}
                  rating={rating}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Navigation Bar (Left Sidebar) */}
      <div className="skill-page__nav-bar">
        <NavigationBar
          hasBackButton
          hasTextBlock
          // Back button should always return to MainFeedbackPage
          title="Навык"
          onBackClick={() =>
            navigate('/feedback', {
              state: { openDrawerFromSkill: true },
            })
          }
        />
      </div>

      {/* Widget (Right Sidebar) */}
      <div className="skill-page__widget">
        <div className="skill-page__widget-container">
          <div className="skill-page__widget-title">
            <h2>Средняя оценка</h2>
          </div>
          <div className="skill-page__widget-content">
            <Cell
              size="M"
              icon={
                <img 
                  src={successAvatar} 
                  alt="Success avatar" 
                  width="34" 
                  height="34"
                />
              }
            >
              Хорошо справляется
            </Cell>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillPage;

