import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationBar } from '../components/NavigationBar';
import { Cell } from '../components/Cell';
import { PageAction } from '../components/PageAction';
import '../../tokens/css-variables.css';
import './ProfilePage.css';

// Role icon component - colored circle with lightning bolt
const RoleIcon: React.FC<{ color: string }> = ({ color }) => (
  <div 
    className="profile-page__role-icon"
    style={{ backgroundColor: color }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="white" />
    </svg>
  </div>
);

// External link icon
const ExternalLinkIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 13V19C18 20.1 17.1 21 16 21H5C3.9 21 3 20.1 3 19V8C3 6.9 3.9 6 5 6H11M15 3H21M21 3V9M21 3L9 15" stroke="#949494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  // Profile data matching Figma design
  const mainRole = {
    title: 'Специалист',
    subtitle: 'Orion',
    percentage: '60%',
    iconColor: '#82bad4', // sky blue
  };

  const additionalRoles = [
    {
      title: 'Наставник',
      subtitle: 'Опыт развития',
      percentage: '20%',
      iconColor: '#de9c7e', // sand
    },
    {
      title: 'Диалог-коуч',
      subtitle: 'Опыт развития',
      percentage: '10%',
      iconColor: '#b79fe9', // amethyst
    },
    {
      title: 'Помощник в погружении',
      subtitle: 'Опыт развития',
      percentage: '10%',
      iconColor: '#d796c1', // flamingo
    },
  ];

  const generalInfoItems = [
    { label: 'Город и часовой пояс', value: 'Москва, GMT+3', isLink: false },
    { label: 'Телефон', value: '+7 999 000-00-00', isLink: true },
    { label: 'Почта', value: 'test@tochka.com', isLink: true, showIcon: true },
    { label: 'Mattermost', value: 'Александр Бурлин', isLink: true, showIcon: true },
    { label: 'Внутренний номер', value: '123451243', isLink: false },
  ];

  return (
    <div className="profile-page">
      {/* Top Navigation Bar (same pattern as other pages) */}
      <div className="profile-page__top-nav">
        <div className="profile-page__logo">
          <span className="profile-page__logo-text">афина</span>
        </div>
        <div className="profile-page__nav-buttons">
          <button className="profile-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="currentColor" />
            </svg>
            <span>Главная</span>
          </button>
          <button className="profile-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6H16L14 4H10L8 6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H20C21.1 21 22 20.1 22 19V8C22 6.9 21.1 6 20 6Z" fill="currentColor" />
            </svg>
            <span>Задачи</span>
          </button>
          <button className="profile-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="currentColor" />
            </svg>
            <span>Поиск</span>
          </button>
          <button className="profile-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3C8.03 3 4 7.03 4 12H1L4.96 16.03L9 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.07 19 9.32 18.21 8.06 16.94L6.64 18.36C8.27 20 10.51 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z" fill="currentColor" />
            </svg>
            <span>Сервисы</span>
          </button>
          <button className="profile-page__nav-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
            </svg>
            <span>Админка</span>
          </button>
        </div>
        <div className="profile-page__user-section">
          <div className="profile-page__user-info">
            <div className="profile-page__avatar">КВ</div>
            <span className="profile-page__user-name">Константинопольский Василий</span>
          </div>
          <div className="profile-page__user-actions">
            <button className="profile-page__action-icon" aria-label="Face ID">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="currentColor" />
              </svg>
            </button>
            <button className="profile-page__action-icon" aria-label="Settings">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.14 11.06L21.16 9.48C21.34 9.33 21.38 9.07 21.24 8.88L19.24 6.12C19.1 5.93 18.84 5.88 18.65 6.02L16.57 7.58C16.11 7.26 15.6 7.01 15.05 6.84L14.79 4.58C14.75 4.3 14.52 4.09 14.24 4.09H9.76C9.48 4.09 9.25 4.3 9.21 4.58L8.95 6.84C8.4 7.01 7.89 7.26 7.43 7.58L5.35 6.02C5.16 5.88 4.9 5.93 4.76 6.12L2.76 8.88C2.62 9.07 2.66 9.33 2.84 9.48L4.86 11.06C4.82 11.36 4.8 11.67 4.8 12C4.8 12.33 4.82 12.64 4.86 12.94L2.84 14.52C2.66 14.67 2.62 14.93 2.76 15.12L4.76 17.88C4.9 18.07 5.16 18.12 5.35 17.98L7.43 16.42C7.89 16.74 8.4 16.99 8.95 17.16L9.21 19.42C9.25 19.7 9.48 19.91 9.76 19.91H14.24C14.52 19.91 14.75 19.7 14.79 19.42L15.05 17.16C15.6 16.99 16.11 16.74 16.57 16.42L18.65 17.98C18.84 18.12 19.1 18.07 19.24 17.88L21.24 15.12C21.38 14.93 21.34 14.67 21.16 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="profile-page__content">
        <div className="profile-page__header">
          <div className="profile-page__profile-avatar">
            <span className="profile-page__profile-avatar-initials">КВ</span>
          </div>
          <h1 className="profile-page__title">Константинопольский Василий Аркадьевич</h1>
        </div>

        <div className="profile-page__sections">
          {/* Main role block */}
          <section className="profile-page__card">
            <div className="profile-page__card-header">
              <h2 className="profile-page__card-title">Основная роль</h2>
            </div>
            <div className="profile-page__card-content">
              <Cell
                size="M"
                icon={<RoleIcon color={mainRole.iconColor} />}
                label={mainRole.subtitle}
                suffix={mainRole.percentage}
              >
                {mainRole.title}
              </Cell>
            </div>
          </section>

          {/* Additional roles block */}
          <section className="profile-page__card">
            <div className="profile-page__card-header">
              <h2 className="profile-page__card-title">Дополнительные роли</h2>
            </div>
            <div className="profile-page__card-content">
              {additionalRoles.map((role, index) => (
                <Cell
                  key={index}
                  size="M"
                  icon={<RoleIcon color={role.iconColor} />}
                  label={role.subtitle}
                  suffix={role.percentage}
                >
                  {role.title}
                </Cell>
              ))}
              <button className="profile-page__view-all-roles">
                Посмотреть все роли
              </button>
            </div>
          </section>

          {/* General info block */}
          <section className="profile-page__card">
            <div className="profile-page__card-header">
              <h2 className="profile-page__card-title">Общие данные</h2>
            </div>
            <div className="profile-page__card-content">
              {generalInfoItems.map((item, index) => (
                <div key={index} className="profile-page__info-item">
                  <Cell
                    size="M"
                    subtitle={item.label}
                    iconRight={item.showIcon ? <ExternalLinkIcon /> : undefined}
                  >
                    <span className={item.isLink ? 'profile-page__info-link' : ''}>
                      {item.value}
                    </span>
                  </Cell>
                </div>
              ))}
            </div>
          </section>

          {/* Feedback block */}
          <section 
            className="profile-page__card"
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
              navigate('/feedback');
            }}
          >
            <div className="profile-page__card-header">
              <div className="profile-page__card-title-with-icon">
                <h2 className="profile-page__card-title">Обратная связь</h2>
                <svg className="profile-page__chevron-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L12 9L6 14" stroke="#191919" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="profile-page__card-title-accessory">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.0621 22.0329 6.39464C21.7564 5.72718 21.351 5.12075 20.84 4.61V4.61Z" stroke="#949494" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className="profile-page__card-content">
              <Cell
                size="M"
                className="profile-page__feedback-cell"
              >
                Посмотреть обратную связь
              </Cell>
            </div>
          </section>
        </div>

        {/* Logout PageAction */}
        <div className="profile-page__logout">
          <PageAction
            title="Выйти"
            iconLeft={
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9V6C18 4.89543 17.1046 4 16 4H6C4.89543 4 4 4.89543 4 6V24C4 25.1046 4.89543 26 6 26H16C17.1046 26 18 25.1046 18 24V21M26 15H10M26 15L22 19M26 15L22 11" stroke="#D84D4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            }
            onClick={() => {
              // For prototype; in real app this would trigger auth logout
              console.log('Logout clicked');
            }}
          />
        </div>
      </div>

      {/* Navigation Bar (Left Sidebar) */}
      <div className="profile-page__nav-bar">
        <NavigationBar
          hasBackButton
          hasTextBlock
          title="Профиль"
          onBackClick={() => console.log('Back clicked')}
        />
      </div>
    </div>
  );
};

export default ProfilePage;

