export const fetchBudget = async ({ id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`,
  );
  const data = await response.json();

  return data;
};

export const fetchBudgetCategories = async ({ id }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/budgetCategories?budgetId=${id}`,
  );
  const data = await response.json();

  return data;
};

export const addTransaction = async ({ data }) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/transactions`,
    {
      method: 'POST',
      body: JSON.stringify(data),
    },
  );
  const resolve = await response.json();

  return resolve;
};
