import './styles.css';
import { Theme } from './model/theme';

const themeButton = document.getElementById('theme-btn');
themeButton.textContent = `Switch to ${Theme.DARK} mode`;

themeButton.addEventListener('click', () => {
  const htmlElement = document.documentElement;

  if (htmlElement.getAttribute('data-theme') === Theme.LIGHT) {
    htmlElement.setAttribute('data-theme', Theme.DARK);
    themeButton.textContent = `Switch to ${Theme.LIGHT} mode`;
  } else {
    htmlElement.setAttribute('data-theme', Theme.LIGHT);
    themeButton.textContent = `Switch to ${Theme.DARK} mode`;
  }
});
