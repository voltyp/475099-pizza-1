// Регулярка возвращает название картинки без разрешения (.svg)
export const getClassImage = (path) =>
  `filling--${path.match(/[a-z]+(?=.svg)/)[0]}`;
