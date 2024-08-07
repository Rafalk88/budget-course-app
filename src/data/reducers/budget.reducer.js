import {
  LOADING_STAGES,
  BUDGET_GET_REQUEST,
  BUDGET_GET_SUCCESS,
  BUDGET_GET_FAILURE,
  BUDGETED_CATEGORIES_GET_REQUEST,
  BUDGETED_CATEGORIES_GET_SUCCESS,
  BUDGETED_CATEGORIES_GET_FAILURE,
  SET_SELECTED_PARENT_CATEGORY_ID,
  BUDGET_TRANSACTION_ADD_REQUEST,
  BUDGET_TRANSACTION_ADD_SUCCESS,
} from 'data/constants';

const initialState = {
  loadingState: null,
  budget: {},
  budgetedCategories: [],
  selectedParentCategoryId: undefined,
};

// redux boilerplate - do not move state to last
// eslint-disable-next-line default-param-last
export function budget(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case BUDGET_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STAGES.LOADING,
        },
      };

    case BUDGET_GET_SUCCESS:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: action.payload,
        loadingState: newLoadingState,
      };

    case BUDGET_GET_FAILURE:
      delete newLoadingState.BUDGET_GET_REQUEST;
      return {
        ...state,
        budget: {},
        loadingState: newLoadingState,
      };

    case BUDGETED_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STAGES.LOADING,
        },
      };

    case BUDGETED_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetedCategories: action.payload,
        loadingState: newLoadingState,
      };

    case BUDGETED_CATEGORIES_GET_FAILURE:
      delete newLoadingState.BUDGETED_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        budgetedCategories: [],
        loadingState: newLoadingState,
      };

    case SET_SELECTED_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload,
      };

    case BUDGET_TRANSACTION_ADD_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STAGES.LOADING,
        },
      };

    case BUDGET_TRANSACTION_ADD_SUCCESS:
      delete newLoadingState.BUDGET_TRANSACTION_ADD_REQUEST;
      return {
        ...state,
        budget: {
          ...state.budget,
          transactions: [action.payload, ...state.budget.transactions],
        },
        loadingState: newLoadingState,
      };

    default:
      return state;
  }
}
