import { BUDGET_GET, BUDGETED_CATEGORIES_GET } from 'data/constants';
import { budget as API } from 'data/fetch';

export const fetchBudget = (id) => {
  const promise = API.fetchBudget(id);

  return {
    type: BUDGET_GET,
    promise,
  };
};

export const fetchBudgetedCategories = (id) => {
  const promise = API.fetchBudgetCategories(id);

  return {
    type: BUDGETED_CATEGORIES_GET,
    promise,
  };
};
