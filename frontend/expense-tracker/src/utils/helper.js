export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0];
  }
  return initials.toUpperCase();
};

export const addThoushandSeparator = (number) => {
  if (number == null || isNaN(number)) return "";

  const [integerPart, decimalPart] = number.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};
