import { el } from '../utils';

export function button({ text, onClick }) {
  const element = el('button', text, 'btn');

  if (onClick) {
    element.addEventListener('click', onClick);
  }

  return element;
}
