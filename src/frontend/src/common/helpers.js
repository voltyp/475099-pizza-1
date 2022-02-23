// Регулярка возвращает название картинки без разрешения (.svg)
export const getImageName = (path) => path.match(/[a-z]+(?=.svg)/)[0];

export const getCssClassForPizza = (size, sauce) => {
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

export const capitalize = (str) => str.replace(str[0], str[0].toUpperCase());
