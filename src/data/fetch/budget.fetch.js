export function fetchBudget(id) {
  const promise = fetch(
    `${process.env.REACT_APP_API_URL}/budgets/${id}/?_embed=transactions`,
  );

  return promise;
}

export function fetchBudgetCategories(id) {
  const promise = fetch(
    `${process.env.REACT_APP_API_URL}/budgetCategories?budgetId=${id}`,
  );

  return promise;
}

export function addTransaction(data) {
  const promise = fetch(`${process.env.REACT_APP_API_URL}/transactions`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return promise;
}
