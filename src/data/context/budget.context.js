import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const initialValue = {};

const store = createContext(initialValue);
const { Provider } = store;

function BudgetProvider({ children }) {
  const [selectedParentCategoryId, setSelectedParentCategoryId] = useState();
  return (
    <Provider
      value={{
        selectedParentCategoryId,
        setSelectedParentCategoryId,
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
