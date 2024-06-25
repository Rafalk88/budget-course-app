import {
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
} from 'data/constants';
import { budgetAPI as API } from 'data/fetch';

export const fetchBudget = (id) => async (dispatch) => {
  dispatch({
    type: BUDGET_GET_REQUEST,
  });
  try {
    const response = await API.fetchBudget(id);
    const data = response.json();
    dispatch({
      type: BUDGET_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BUDGET_GET_FAILURE,
    });
  }
};

export const fetchBudgetedCategories = () => {};
