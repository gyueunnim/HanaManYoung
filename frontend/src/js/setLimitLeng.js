export const setLimitLeng = (e, setter, maxLength) => {
  const value = e.target.value;
  if (value.length <= maxLength) {
    setter(value);
  }
};
