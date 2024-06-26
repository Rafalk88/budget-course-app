import {
  LOADING_STAGES,
  ALL_CATEGORIES_GET_REQUEST,
  ALL_CATEGORIES_GET_SUCCESS,
  ALL_CATEGORIES_GET_FAILURE,
} from 'data/constants';

const initialState = {
  loadingState: null,
  allCategories: [],
};

// redux boilerplate - do not move state to last
// eslint-disable-next-line default-param-last
export function common(state = initialState, action) {
  const newLoadingState = { ...state.loadingState };

  switch (action.type) {
    case ALL_CATEGORIES_GET_REQUEST:
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          [action.type]: LOADING_STAGES.LOADING,
        },
      };

    case ALL_CATEGORIES_GET_SUCCESS:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        allCategories: action.payload,
        loadingState: newLoadingState,
      };

    case ALL_CATEGORIES_GET_FAILURE:
      delete newLoadingState.ALL_CATEGORIES_GET_REQUEST;
      return {
        ...state,
        allCategories: [],
        loadingState: newLoadingState,
      };

    default:
      return state;
  }
}
