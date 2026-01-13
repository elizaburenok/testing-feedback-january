import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { SearchInput } from '../components/SearchInput';
import { Chip } from '../components/Chip';
import { FeedbackCard } from '../components/FeedbackCard';
import { Cell } from '../components/Cell';
import { DrawerHeader, DrawerFooter } from '../components/Drawer';
import { Dropdown } from '../components/Dropdown';
import { SkillsModal } from '../components/SkillsModal';
import { Calendar } from '../components/Calendar';
import { feedbackCardsData } from '../data/feedbackCards';
import { filterDropdownItems } from '../data/filterDropdowns';
import { skillsData, competenciesData } from '../data/skills';
import { formatDateShort, isSameDay } from '../utils/dateFormat';
import '../../tokens/css-variables.css';
import './MainFeedbackPage.css';

const WarningAvatarIcon: React.FC = () => (
  <svg
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M22 0C37 0 44 7 44 22C44 37 37 44 22 44C7 44 0 37 0 22C0 7 7 0 22 0Z"
      fill="#FCF5E3"
    />
    <path
      d="M15.0349 25.4039C15.3642 25.2393 15.7647 25.3726 15.9294 25.7018C16.8887 27.6203 18.8185 28.6666 21.9998 28.6666C22.3679 28.6666 22.6667 28.9654 22.6667 29.3336C22.6666 29.7017 22.3678 29.9996 21.9998 29.9996C18.5149 29.9996 16 28.8241 14.7371 26.2985C14.5725 25.9693 14.7059 25.5687 15.0349 25.4039ZM25.9353 14.0035C26.3018 13.968 26.6282 14.2357 26.6638 14.6022C26.8791 16.8195 27.9723 21.3304 29.28 24.3912C29.421 24.7216 29.2743 25.1042 28.949 25.2565C26.0597 26.6088 23.0957 25.9673 21.5447 24.5153C21.2759 24.2636 21.2618 23.8417 21.5134 23.5729C21.765 23.3043 22.1871 23.2902 22.4558 23.5416C23.4818 24.5022 25.568 25.093 27.7976 24.2916C26.555 21.1532 25.5512 16.9408 25.3367 14.7311C25.3011 14.3647 25.569 14.0393 25.9353 14.0035ZM17.6667 13.9996C18.9554 13.9996 19.9998 15.045 19.9998 16.3336C19.9996 17.6221 18.9553 18.6666 17.6667 18.6666C16.3782 18.6666 15.3339 17.6221 15.3337 16.3336C15.3337 15.045 16.3781 13.9996 17.6667 13.9996Z"
      fill="#D84D4D"
    />
  </svg>
);

const AvatarIcon: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M22 0C37 0 44 7 44 22C44 37 37 44 22 44C7 44 0 37 0 22C0 7 7 0 22 0Z"
      fill="#DDF8EF"
    />
    <path
      d="M15.0349 25.4041C15.3642 25.2394 15.7647 25.3727 15.9294 25.7019C16.8887 27.6204 18.8185 28.6667 21.9998 28.6667C22.3679 28.6667 22.6667 28.9655 22.6667 29.3337C22.6666 29.7018 22.3678 29.9998 21.9998 29.9998C18.5149 29.9997 16 28.8242 14.7371 26.2986C14.5725 25.9694 14.7059 25.5688 15.0349 25.4041ZM25.9353 14.0037C26.3018 13.9681 26.6282 14.2358 26.6638 14.6023C26.8791 16.8197 27.9723 21.3306 29.28 24.3914C29.421 24.7217 29.2743 25.1043 28.949 25.2566C26.0597 26.609 23.0957 25.9675 21.5447 24.5154C21.2759 24.2637 21.2618 23.8418 21.5134 23.573C21.765 23.3044 22.1871 23.2903 22.4558 23.5417C23.4818 24.5023 25.568 25.0931 27.7976 24.2917C26.555 21.1534 25.5512 16.9409 25.3367 14.7312C25.3011 14.3649 25.569 14.0394 25.9353 14.0037ZM17.6667 13.9998C18.9554 13.9998 19.9998 15.0451 19.9998 16.3337C19.9996 17.6223 18.9553 18.6667 17.6667 18.6667C16.3782 18.6667 15.3339 17.6223 15.3337 16.3337C15.3337 15.0451 16.3781 13.9998 17.6667 13.9998Z"
      fill="#5CAD9A"
    />
  </svg>
);

const LeftAccessoryIcon: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M22 0C37 0 44 7 44 22C44 37 37 44 22 44C7 44 0 37 0 22C0 7 7 0 22 0Z"
      fill="#FCF5E3"
    />
    <path
      d="M15.0349 25.4039C15.3642 25.2393 15.7647 25.3726 15.9294 25.7018C16.8887 27.6203 18.8185 28.6666 21.9998 28.6666C22.3679 28.6666 22.6667 28.9654 22.6667 29.3336C22.6666 29.7017 22.3678 29.9996 21.9998 29.9996C18.5149 29.9996 16 28.8241 14.7371 26.2985C14.5725 25.9693 14.7059 25.5687 15.0349 25.4039ZM25.9353 14.0035C26.3018 13.968 26.6282 14.2357 26.6638 14.6022C26.8791 16.8195 27.9723 21.3304 29.28 24.3912C29.421 24.7216 29.2743 25.1042 28.949 25.2565C26.0597 26.6088 23.0957 25.9673 21.5447 24.5153C21.2759 24.2636 21.2618 23.8417 21.5134 23.5729C21.765 23.3043 22.1871 23.2902 22.4558 23.5416C23.4818 24.5022 25.568 25.093 27.7976 24.2916C26.555 21.1532 25.5512 16.9408 25.3367 14.7311C25.3011 14.3647 25.569 14.0393 25.9353 14.0035ZM17.6667 13.9996C18.9554 13.9996 19.9998 15.045 19.9998 16.3336C19.9996 17.6221 18.9553 18.6666 17.6667 18.6666C16.3782 18.6666 15.3339 17.6221 15.3337 16.3336C15.3337 15.045 16.3781 13.9996 17.6667 13.9996Z"
      fill="#D84D4D"
    />
  </svg>
);

const SuccessAvatarIcon: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <path
      d="M22 0C37 0 44 7 44 22C44 37 37 44 22 44C7 44 0 37 0 22C0 7 7 0 22 0Z"
      fill="#DDF8EF"
    />
    <path
      d="M15.0349 25.4041C15.3642 25.2394 15.7647 25.3727 15.9294 25.7019C16.8887 27.6204 18.8185 28.6667 21.9998 28.6667C22.3679 28.6667 22.6667 28.9655 22.6667 29.3337C22.6666 29.7018 22.3678 29.9998 21.9998 29.9998C18.5149 29.9997 16 28.8242 14.7371 26.2986C14.5725 25.9694 14.7059 25.5688 15.0349 25.4041ZM25.9353 14.0037C26.3018 13.9681 26.6282 14.2358 26.6638 14.6023C26.8791 16.8197 27.9723 21.3306 29.28 24.3914C29.421 24.7217 29.2743 25.1043 28.949 25.2566C26.0597 26.609 23.0957 25.9675 21.5447 24.5154C21.2759 24.2637 21.2618 23.8418 21.5134 23.573C21.765 23.3044 22.1871 23.2903 22.4558 23.5417C23.4818 24.5023 25.568 25.0931 27.7976 24.2917C26.555 21.1534 25.5512 16.9409 25.3367 14.7312C25.3011 14.3649 25.569 14.0394 25.9353 14.0037ZM17.6667 13.9998C18.9554 13.9998 19.9998 15.0451 19.9998 16.3337C19.9996 17.6223 18.9553 18.6667 17.6667 18.6667C16.3782 18.6667 15.3339 17.6223 15.3337 16.3337C15.3337 15.0451 16.3781 13.9998 17.6667 13.9998Z"
      fill="#5CAD9A"
    />
  </svg>
);

export const MainFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFeedbackIndex, setActiveFeedbackIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{ period?: string; activity?: string }>({});
  const [checkedActivities, setCheckedActivities] = useState<Set<string>>(new Set());
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(new Set());
  const [selectedCompetencyId, setSelectedCompetencyId] = useState<string | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [drawerRatingFilter, setDrawerRatingFilter] = useState<string | null>(null);
  const [drawerOpenDropdown, setDrawerOpenDropdown] = useState<string | null>(null);
  const competencies = [
    {
      title: 'Знания',
      description: 'Хорошо справляется',
      status: 'warning' as const,
    },
    {
      title: 'Отношение к клиенту',
      description: 'Хорошо справляется',
      status: 'success' as const,
    },
    {
      title: 'Всё зависит от тебя',
      description: 'Стоит обратит внимание',
      status: 'warning' as const,
    },
    {
      title: 'Бережём друг друга',
      description: 'Стоит обратит внимание',
      status: 'warning' as const,
    },
    {
      title: 'Не ждём спокойной жизни',
      description: 'Хорошо справляется',
      status: 'success' as const,
    },
  ];

  const scrollToTopInstant = () => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtml = html.style.scrollBehavior;
    const prevBody = body.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    body.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    html.style.scrollBehavior = prevHtml;
    body.style.scrollBehavior = prevBody;
  };

  useEffect(() => {
    const state = location.state as { openDrawerFromSkill?: boolean } | null;

    if (state?.openDrawerFromSkill) {
      setIsSidebarOpen(true);
      scrollToTopInstant();
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Helper function to format activity count with Russian pluralization
  const getActivityLabel = (count: number): string => {
    if (count === 0) {
      return 'Активность';
    }
    if (count === 1) {
      return '1 активность';
    }
    if (count >= 2 && count <= 4) {
      return `${count} активности`;
    }
    // 5+ items
    return `${count} активностей`;
  };

  // Helper function to format skills count with Russian pluralization
  const getSkillsLabel = (count: number): string => {
    if (count === 0) {
      return 'Навык';
    }
    if (count === 1) {
      return '1 навык';
    }
    if (count >= 2 && count <= 4) {
      return `${count} навыка`;
    }
    // 5+ items
    return `${count} навыков`;
  };

  // Map activity type labels (from card names) to dropdown IDs
  const activityTypeToIdMap: { [key: string]: string } = {
    'Чек-беседа': 'Check-meeting',
    'Групповая встреча': 'Group-meeting',
    'Практика': 'Practice',
    'Встреча с Диалог‑коучем': 'Dialog-coach',
    'Встреча тет‑а‑тет': 'Tet-a-tet',
    'Самостоятельное изучение': 'Self-learning',
  };

  // Extract activity type from card name (prefix before colon or parenthesis)
  const extractActivityType = (cardName: string): string | null => {
    // Match pattern: "Activity Type (optional text): rest of name"
    // or "Activity Type: rest of name"
    const match = cardName.match(/^([^:(]+?)(?:\s*\([^)]+\))?\s*:/);
    if (match) {
      const activityType = match[1].trim();
      return activityType;
    }
    return null;
  };

  // Get activity ID for a card based on its name
  const getCardActivityId = (cardName: string): string | null => {
    const activityType = extractActivityType(cardName);
    if (activityType && activityTypeToIdMap[activityType]) {
      return activityTypeToIdMap[activityType];
    }
    return null;
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFeedbackCards = feedbackCardsData.filter((card) => {
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

    // Date filter - card must match the selected date
    if (selectedDate) {
      const cardDate = typeof card.date === 'string' ? new Date(card.date) : card.date;
      if (!isSameDay(cardDate, selectedDate)) {
        return false;
      }
    }

    // Activity type filter - card must match one of the selected activity types
    if (checkedActivities.size > 0) {
      const cardActivityId = getCardActivityId(card.name);
      if (!cardActivityId || !checkedActivities.has(cardActivityId)) {
        return false;
      }
    }

    // Skills filter - card must have at least one of the selected skills
    if (selectedSkillIds.size > 0) {
      const cardHasSelectedSkill = card.skillIds.some((skillId) =>
        selectedSkillIds.has(skillId)
      );
      if (!cardHasSelectedSkill) return false;
    }

    return true;
  });

  // Create activity items with checked state for multi-select
  const activityItemsWithChecked = filterDropdownItems.activity.map(item => ({
    ...item,
    checked: checkedActivities.has(item.id),
  }));

  return (
    <div className="main-feedback-page">
      {/* Top Navigation Bar */}
      <div className="main-feedback-page__top-nav">
        <div className="main-feedback-page__logo">
          <span className="main-feedback-page__logo-text">афина</span>
        </div>
        <div className="main-feedback-page__nav-buttons">
          <button className="main-feedback-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
            </svg>
            <span>Главная</span>
          </button>
          <button className="main-feedback-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H16L14 4H10L8 6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6Z" fill="currentColor" />
            </svg>
            <span>Задачи</span>
          </button>
          <button className="main-feedback-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
            </svg>
            <span>Поиск</span>
          </button>
          <button className="main-feedback-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3C8.03 3 4 7.03 4 12H1L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 20 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor" />
            </svg>
            <span>Сервисы</span>
          </button>
          <button className="main-feedback-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
            </svg>
            <span>Админка</span>
          </button>
        </div>
        <div className="main-feedback-page__user-section">
          <div className="main-feedback-page__user-info">
            <div className="main-feedback-page__avatar">БА</div>
            <span className="main-feedback-page__user-name">Бурлин Александр</span>
          </div>
          <div className="main-feedback-page__user-actions">
            <button className="main-feedback-page__action-icon" aria-label="Face ID">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor" />
              </svg>
            </button>
            <button className="main-feedback-page__action-icon" aria-label="Settings">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.14 11.06L21.16 9.48C21.34 9.33 21.38 9.07 21.24 8.88L19.24 6.12C19.1 5.93 18.84 5.88 18.65 6.02L16.57 7.58C16.11 7.26 15.6 7.01 15.05 6.84L14.79 4.58C14.75 4.3 14.52 4.09 14.24 4.09H9.76C9.48 4.09 9.25 4.3 9.21 4.58L8.95 6.84C8.4 7.01 7.89 7.26 7.43 7.58L5.35 6.02C5.16 5.88 4.9 5.93 4.76 6.12L2.76 8.88C2.62 9.07 2.66 9.33 2.84 9.48L4.86 11.06C4.82 11.36 4.8 11.67 4.8 12C4.8 12.33 4.82 12.64 4.86 12.94L2.84 14.52C2.66 14.67 2.62 14.93 2.76 15.12L4.76 17.88C4.9 18.07 5.16 18.12 5.35 17.98L7.43 16.42C7.89 16.74 8.4 16.99 8.95 17.16L9.21 19.42C9.25 19.7 9.48 19.91 9.76 19.91H14.24C14.52 19.91 14.75 19.7 14.79 19.42L15.05 17.16C15.6 16.99 16.11 16.74 16.57 16.42L18.65 17.98C18.84 18.12 19.1 18.07 19.24 17.88L21.24 15.12C21.38 14.93 21.34 14.67 21.16 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-feedback-page__content">
        {/* Header Section */}
        <div className="main-feedback-page__header">
          <h1 className="main-feedback-page__title">Все события</h1>
          <div className="main-feedback-page__search-filters">
            <div className="main-feedback-page__search">
              <SearchInput
                placeholder="Поиск активности или автора"
                size="s"
                variant="filled"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
              />
            </div>
            <div className="main-feedback-page__filters">
              <div className="main-feedback-page__filter-wrapper">
                <Chip
                  variant="dropdown"
                  label={selectedDate ? formatDateShort(selectedDate) : "Период"}
                  dropdownOpen={openDropdown === 'period'}
                  selected={!!selectedDate}
                  showResetIcon={!!selectedDate}
                  onClick={() => setOpenDropdown(openDropdown === 'period' ? null : 'period')}
                  onReset={() => {
                    setSelectedDate(null);
                    setOpenDropdown(null);
                  }}
                />
                {openDropdown === 'period' && (
                  <Calendar
                    open={true}
                    selectedDate={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setOpenDropdown(null);
                    }}
                    onClose={() => setOpenDropdown(null)}
                    initialMonth={selectedDate || new Date()}
                  />
                )}
              </div>
              <div className="main-feedback-page__filter-wrapper">
                <Chip
                  variant="dropdown"
                  label={getActivityLabel(checkedActivities.size)}
                  dropdownOpen={openDropdown === 'activity'}
                  selected={checkedActivities.size > 0}
                  showResetIcon={checkedActivities.size > 0}
                  onClick={() => setOpenDropdown(openDropdown === 'activity' ? null : 'activity')}
                  onReset={() => {
                    setCheckedActivities(new Set());
                    setOpenDropdown(null);
                  }}
                />
                {openDropdown === 'activity' && (
                  <Dropdown
                    type="list"
                    mode="desktop"
                    items={activityItemsWithChecked}
                    open={true}
                    showCheckbox={true}
                    onSelect={(item) => {
                      // Toggle checked state for multi-select
                      const newChecked = new Set(checkedActivities);
                      if (newChecked.has(item.id)) {
                        newChecked.delete(item.id);
                      } else {
                        newChecked.add(item.id);
                      }
                      setCheckedActivities(newChecked);
                      // Don't close dropdown on select for multi-select behavior
                    }}
                    onClose={() => setOpenDropdown(null)}
                  />
                )}
              </div>
              <Chip
                variant="action"
                label={getSkillsLabel(selectedSkillIds.size)}
                selected={selectedSkillIds.size > 0}
                showResetIcon={selectedSkillIds.size > 0}
                onClick={() => setIsSkillsModalOpen(true)}
                onReset={() => {
                  setSelectedSkillIds(new Set());
                  setSelectedCompetencyId(undefined);
                }}
              />
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="main-feedback-page__list">
          {filteredFeedbackCards.map((card, index) => {
            // Calculate matched skills for contextual notification
            const matchedSkills = selectedSkillIds.size > 0 && card.skillIds
              ? card.skillIds
                  .filter(skillId => selectedSkillIds.has(skillId))
                  .map(skillId => {
                    const skill = skillsData.find(s => s.id === skillId);
                    return skill ? { id: skill.id, label: skill.label } : null;
                  })
                  .filter((skill): skill is { id: string; label: string } => skill !== null)
              : undefined;

            // Find the original index of this card in feedbackCardsData
            const originalIndex = feedbackCardsData.findIndex(
              (originalCard) =>
                originalCard.name === card.name &&
                originalCard.author === card.author &&
                originalCard.date.toString() === card.date.toString()
            );

            return (
              <FeedbackCard
                key={`${card.author}-${index}`}
                name={card.name}
                date={card.date}
                author={card.author}
                strengths={card.strengths}
                growthZone={card.growthZone}
                skillIds={card.skillIds}
                matchedSkills={matchedSkills}
                primaryAction={{
                  label: 'Посмотреть навыки',
                  onClick: () => {
                    // Use original index to show correct card in drawer
                    setActiveFeedbackIndex(originalIndex >= 0 ? originalIndex : null);
                    setIsSidebarOpen(true);
                  },
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Navigation Bar (Left Sidebar) */}
      <div className="main-feedback-page__nav-bar">
        <NavigationBar
          hasBackButton
          hasTextBlock
          title="Обратная связь"
          subtitle="Константинопольский Василий Аркадьевич — Специалист"
          onBackClick={() => console.log('Back clicked')}
        />
      </div>

      {/* Widget (Right Sidebar) */}
      <div className="main-feedback-page__widget">
        <div className="main-feedback-page__widget-container">
          <div className="main-feedback-page__widget-title">
            <h2>Компетенции</h2>
          </div>
          <div className="main-feedback-page__widget-content">
            {competencies.map((comp, index) => {
              const shouldUseLeftAccessory = comp.title === 'Бережём друг друга' || comp.title === 'Всё зависит от тебя';
              return (
                <Cell
                  key={index}
                  size="M"
                  icon={
                    <div className="main-feedback-page__icon-avatar-wrapper">
                      {shouldUseLeftAccessory ? <LeftAccessoryIcon /> : <AvatarIcon />}
                    </div>
                  }
                  label={comp.description}
                >
                  {comp.title}
                </Cell>
              );
            })}
          </div>
        </div>
      </div>

      {/* Details Sidebar (Right Panel) */}
      {isSidebarOpen && (
        <div className="main-feedback-page__details-sidebar">
          <DrawerHeader onClose={() => setIsSidebarOpen(false)}>
            Навыки сотрудника
          </DrawerHeader>
          <div className="main-feedback-page__details-sidebar-content">
            <div className="main-feedback-page__drawer-search">
              <SearchInput
                size="s"
                variant="filled"
                placeholder="Поиск навыков"
              />
            </div>

            <div className="main-feedback-page__drawer-filters">
              <div className="main-feedback-page__filter-wrapper">
                <Chip variant="dropdown" label="Компетенции" />
              </div>
              <div className="main-feedback-page__filter-wrapper">
                <Chip
                  variant="dropdown"
                  label={drawerRatingFilter || "Оценка"}
                  dropdownOpen={drawerOpenDropdown === 'rating'}
                  selected={!!drawerRatingFilter}
                  showResetIcon={!!drawerRatingFilter}
                  onClick={() => setDrawerOpenDropdown(drawerOpenDropdown === 'rating' ? null : 'rating')}
                  onReset={() => {
                    setDrawerRatingFilter(null);
                    setDrawerOpenDropdown(null);
                  }}
                />
                {drawerOpenDropdown === 'rating' && (
                  <Dropdown
                    type="list"
                    mode="desktop"
                    items={filterDropdownItems.rating}
                    open={true}
                    onSelect={(item) => {
                      setDrawerRatingFilter(item.label);
                      setDrawerOpenDropdown(null);
                    }}
                    onClose={() => setDrawerOpenDropdown(null)}
                  />
                )}
              </div>
            </div>

            <div className="main-feedback-page__drawer-competencies">
              {activeFeedbackIndex !== null ? (
                // Show skills for the selected feedback card
                (() => {
                  const activeCard = feedbackCardsData[activeFeedbackIndex];
                  // Create a map for quick skill lookup
                  const skillsMap = new Map(skillsData.map((skill) => [skill.id, skill]));
                  // Preserve order from skillIds and remove duplicates
                  const seenSkillIds = new Set<string>();
                  const cardSkills = activeCard.skillIds
                    .map((skillId) => {
                      if (seenSkillIds.has(skillId)) {
                        return null; // Skip duplicates
                      }
                      seenSkillIds.add(skillId);
                      return skillsMap.get(skillId);
                    })
                    .filter((skill): skill is NonNullable<typeof skill> => skill !== null);
                  
                  if (cardSkills.length === 0) {
                    return <div className="main-feedback-page__drawer-empty">Нет навыков</div>;
                  }
                  
                  // SkillIds that should use SuccessAvatarIcon
                  const successSkillIds = new Set(['adapt-3', 'client-7', 'self-2', 'knowledge-5']);
                  // SkillIds that should use 'Хорошо справляется' label and SuccessAvatarIcon
                  const wellPerformingSkillIds = new Set(['client-4', 'adapt-1', 'self-2']);
                  // SkillIds from card at index 4 (line 69-70) that should use 'Хорошо справляется' label
                  const wellPerformingSkillIdsCard4 = new Set(['adapt-3', 'client-7', 'self-2', 'knowledge-5']);
                  // Cards at index 3 (line 51) and index 4 (line 69-70) should use different label
                  const isCardWithAttentionLabel = activeFeedbackIndex === 3 || activeFeedbackIndex === 4;
                  const defaultCellLabel = isCardWithAttentionLabel ? 'Стоит обратить внимание' : 'Хорошо справляется';
                  
                  return cardSkills
                    .filter((skill) => {
                      // Filter by rating if drawerRatingFilter is set
                      if (drawerRatingFilter) {
                        const useSuccessIcon = successSkillIds.has(skill.id) || wellPerformingSkillIds.has(skill.id);
                        const cellLabel = wellPerformingSkillIds.has(skill.id) || (activeFeedbackIndex === 4 && wellPerformingSkillIdsCard4.has(skill.id)) ? 'Хорошо справляется' : defaultCellLabel;
                        
                        if (drawerRatingFilter === 'Хорошо справляется') {
                          return cellLabel === 'Хорошо справляется';
                        } else if (drawerRatingFilter === 'Стоит обратить внимание') {
                          return cellLabel !== 'Хорошо справляется';
                        }
                      }
                      return true;
                    })
                    .map((skill) => {
                      const competency = competenciesData.find(
                        (comp) => comp.id === skill.competencyId
                      );
                      const useSuccessIcon = successSkillIds.has(skill.id) || wellPerformingSkillIds.has(skill.id);
                      // Use 'Хорошо справляется' for specific skillIds, otherwise use default label
                      // For card at index 4, use 'Хорошо справляется' for skillIds in wellPerformingSkillIdsCard4
                      const cellLabel = wellPerformingSkillIds.has(skill.id) || (activeFeedbackIndex === 4 && wellPerformingSkillIdsCard4.has(skill.id)) ? 'Хорошо справляется' : defaultCellLabel;
                      return (
                        <Cell
                          key={skill.id}
                          size="L"
                          subtitle={competency?.label || 'Компетенция'}
                          label={cellLabel}
                        icon={
                          <div className="main-feedback-page__skill-icon-wrapper">
                            {useSuccessIcon ? <SuccessAvatarIcon /> : <WarningAvatarIcon />}
                          </div>
                        }
                          onClick={() => {
                            navigate(`/skill/${skill.id}`);
                            setIsSidebarOpen(false);
                          }}
                        >
                          {skill.label}
                        </Cell>
                      );
                    });
                })()
              ) : (
                // Fallback: show competencies if no card is selected
                competencies.map((comp, index) => (
                  <Cell
                    key={index}
                    size="L"
                    subtitle="Компетенция"
                    label={comp.description}
                  >
                    {comp.title}
                  </Cell>
                ))
              )}
            </div>
          </div>
          <DrawerFooter type="Empty" />
        </div>
      )}

      {/* Skills Modal */}
      <SkillsModal
        open={isSkillsModalOpen}
        skills={skillsData}
        competencies={competenciesData}
        selectedSkillIds={selectedSkillIds}
        selectedCompetencyId={selectedCompetencyId}
        onClose={() => setIsSkillsModalOpen(false)}
        onApplyFilter={(skillIds) => {
          setSelectedSkillIds(skillIds);
        }}
        onCompetencyChange={setSelectedCompetencyId}
      />
    </div>
  );
};

export default MainFeedbackPage;

