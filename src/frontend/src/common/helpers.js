// Регулярка возвращает название картинки без разрешения (.svg)
export const getImageName = (path) => path.match(/[a-z]+(?=.svg)/)[0];

export const getTypeDough = (size, sauce) => {
  if (size.includes("Тонкое")) {
    return sauce === "Томатный"
      ? "pizza--foundation--small-tomato"
      : "pizza--foundation--small-creamy";
  }

  if (size.includes("Толстое")) {
    return sauce === "Томатный"
      ? "pizza--foundation--big-tomato"
      : "pizza--foundation--big-creamy";
  }

  return "pizza--foundation--big-creamy";
};
