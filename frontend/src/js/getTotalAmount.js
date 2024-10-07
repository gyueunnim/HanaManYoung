const getIncomeAmount = (data) => {
  let total = 0;
  data.forEach((item) => {
    const amount = parseInt(item.acc_t_amount);
    if (amount > 0) total += amount;
  });
  return total;
};

const getExpenseAmount = (data) => {
  let total = 0;
  data.forEach((item) => {
    const amount = parseInt(item.acc_t_amount);
    if (amount < 0) total += amount;
  });
  return total;
};

export { getIncomeAmount, getExpenseAmount };
