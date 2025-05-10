import { el } from '../utils';
import { button } from './button';

export function markupSelectorItem({ contents, onSelect }) {
  const selectBtn = button({
    text: 'Select',
    onClick: onSelect
  });

  const markupEl = el(
    'div',
    [
      el('pre', el('code', contents)),
      selectBtn
    ],
    'flex-column align-center'
  );

  return markupEl;
}
