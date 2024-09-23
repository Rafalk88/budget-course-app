/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react';
import { BudgetContext } from 'data/context';
import PropTypes from 'prop-types';

import { SELECT_PARENT_CATEGORY_ID } from 'data/constants';

export const Item = React.memo(({ item, onClickHandler, isActive }) => {
  const { dispatch } = useContext(BudgetContext.store);
  const handleClick = useCallback(() => {
    if (isActive) {
      onClickHandler(null);
      dispatch({ type: SELECT_PARENT_CATEGORY_ID, payload: undefined });
    } else {
      onClickHandler(item.id);
      dispatch({ type: SELECT_PARENT_CATEGORY_ID, payload: item.id });
    }
  }, [isActive, onClickHandler, dispatch]);

  return (
    <div>
      <item.Trigger onClick={handleClick} />
      {isActive && item.children}
    </div>
  );
});

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Trigger: PropTypes.elementType.isRequired,
    children: PropTypes.node,
  }).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
