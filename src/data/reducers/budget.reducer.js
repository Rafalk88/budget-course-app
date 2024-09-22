import { SET_SELECTED_PARENT_CATEGORY_ID } from 'data/constants';

const initialState = {
  selectedParentCategoryId: undefined,
};

// eslint-disable-next-line default-param-last
export function budget(state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload,
      };

    default:
      return state;
  }
}
