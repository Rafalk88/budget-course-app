/* eslint-disable consistent-return */
import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { SELECT_PARENT_CATEGORY_ID } from 'data/constants';

const initialValue = {};

const store = createContext(initialValue);
const { Provider } = store;

function reducer(state, action) {
  switch (action.type) {
    case SELECT_PARENT_CATEGORY_ID:
      return {
        ...state,
        selectedParentCategoryId: action.payload,
      };
    default:
      break;
  }
}

function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </Provider>
  );
}

export const BudgetContext = {
  store,
  BudgetProvider,
};

BudgetProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
