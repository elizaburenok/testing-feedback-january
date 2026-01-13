/**
 * Filter Dropdown Data
 * Configuration data for filter dropdowns in the main feedback page
 */

import React from 'react';
import { DropdownItem } from '../components/Dropdown/Dropdown';

/**
 * Success Avatar Icon (green) for "Хорошо справляется"
 */
const SuccessAvatarIcon: React.FC = () => (
  <svg
    width="34"
    height="34"
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

/**
 * Warning Avatar Icon (yellow/red) for "Стоит обратить внимание"
 */
const WarningAvatarIcon: React.FC = () => (
  <svg
    width="34"
    height="34"
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

/**
 * Dropdown items for Period filter (Период)
 */
export const periodDropdownItems: DropdownItem[] = [
  {
    id: 'today',
    label: 'Сегодня',
  },
  {
    id: 'week',
    label: 'Неделя',
  },
  {
    id: 'month',
    label: 'Месяц',
  },
  {
    id: 'year',
    label: 'Год',
  },
];

/**
 * Dropdown items for Activity filter (Активность)
 */
export const activityDropdownItems: DropdownItem[] = [
  {
    id: 'Dialog-coach',
    label: 'Встреча с Диалог‑коучем',
  },
  {
    id: 'Tet-a-tet',
    label: 'Встреча тет‑а‑тет',
  },
  {
    id: 'Group-meeting',
    label: 'Групповая встреча',
  },
  {
    id: 'Practice',
    label: 'Практика',
  },
  {
    id: 'Self-learning',
    label: 'Самостоятельное изучение',
  },
  {
    id: 'Check-meeting',
    label: 'Чек-беседа',
  },
];

/**
 * Dropdown items for Rating filter (Оценка)
 */
export const ratingDropdownItems: DropdownItem[] = [
  {
    id: 'well-performing',
    label: 'Хорошо справляется',
    icon: <SuccessAvatarIcon />,
  },
  {
    id: 'needs-attention',
    label: 'Стоит обратить внимание',
    icon: <WarningAvatarIcon />,
  },
];

/**
 * Map of filter dropdown items
 * Key is the filter identifier, value is the array of dropdown items
 */
export const filterDropdownItems: { [key: string]: DropdownItem[] } = {
  period: periodDropdownItems,
  activity: activityDropdownItems,
  rating: ratingDropdownItems,
};
