import { BUDGET_GET, BUDGETED_CATEGORIES_GET } from 'data/constants';
import { budget as API } from 'data/fetch';

export const fetchBudget = (id) => (dispatch) => {
  const promise = API.fetchBudget(id);

  dispatch({
    type: BUDGET_GET,
    promise,
  });
};

export const fetchBudgetedCategories = (id) => (dispatch) => {
  const promise = API.fetchBudgetCategories(id);

  dispatch({
    type: BUDGETED_CATEGORIES_GET,
    promise,
  });
};
