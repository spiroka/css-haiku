export function el(tagName, children, className = '') {
  const element = document.createElement(tagName);

  if (Array.isArray(children)) {
    element.append(...children);
  } else if (children) {
    element.append(children);
  }

  element.className = className;

  return element;
}
