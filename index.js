import Prism, { highlight, tokenize } from 'prismjs';

import { markupSelectorItem } from './components/markup-selector-item';

const markupSelectorContainer = document.getElementById('markup-selector-container');
const markupSelector = document.getElementById('markup-selector');
const editor = document.getElementById('editor');
const editorWarning = document.getElementById('editor-warning');
const editorHighlight = document.getElementById('editor-highlight').querySelector('code');
const preview = document.getElementById('preview');
const haiku = document.getElementById('haiku');
const canvas = document.getElementById('canvas');
const aboutBtn = document.getElementById('about-button');
const aboutDialog = document.querySelector('dialog');
const aboutCheckbox = document.getElementById('about-dont-show-again');

aboutBtn.addEventListener('click', () => {
  aboutDialog.showModal();
});

aboutCheckbox.addEventListener('change', ({ target: { checked } }) => {
  if (checked) {
    localStorage.setItem('dont-show-about', 'true');
  } else {
    localStorage.removeItem('dont-show-about');
  }
});

if (localStorage.getItem('dont-show-about') !== 'true') {
  aboutDialog.showModal();
} else {
  aboutCheckbox.closest('label').remove();
}

let selectedElement;

for (let element of preview.children) {
  const contents = element.innerHTML
    .split('\n')
    .map((line) => line.trim())
    .join('\n');

  const markupEl = markupSelectorItem({
    contents,
    onSelect() {
      document.startViewTransition(() => {
        selectedElement = element;
        element.style.display = 'flex';
        haiku.style.display = 'flex';
        markupSelectorContainer.remove();
        document.querySelector('main').classList.remove('justify-center');
        editor.focus();
      });
    }
  });

  markupSelector.append(markupEl);
}

editor.addEventListener('input', ({ target: { textContent: css } }) => {
  for (let i = 0; i < selectedElement.children.length; i++) {
    const child = selectedElement.children.item(i);
    child.style = `${css}; --index: ${i}; --random: ${Math.random()}`;
  }

  const tokens = tokenize(css, Prism.languages.css);
  const properties = tokens.filter(({ type }) => type === 'property');

  if (properties.length > 3) {
    editorWarning.style.display = 'block';
  } else {
    editorWarning.style.display = 'none';
  }

  const highlighted = highlight(css, Prism.languages.css, 'css');

  editorHighlight.innerHTML = highlighted;
});

// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// const ctx = canvas.getContext('2d');
// ctx.lineCap = 'round';
// ctx.fillStyle = getComputedStyle(canvas).getPropertyValue('--color-text1');
// ctx.moveTo(0, 0);
// ctx.lineTo(50, 100);
// ctx.lineWidth = 3;
// ctx.stroke();
// ctx.lineTo(70, 120);
// ctx.lineWidth = 2;
// ctx.stroke();
