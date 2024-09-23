/* eslint-disable react/prop-types */
import React, { useCallback, useContext } from 'react';
import { BudgetContext } from 'data/context';
import PropTypes from 'prop-types';

export const Item = React.memo(({ item, onClickHandler, isActive }) => {
  const { setSelectedParentCategoryId } = useContext(BudgetContext.store);
  const handleClick = useCallback(() => {
    if (isActive) {
      onClickHandler(null);
      setSelectedParentCategoryId(undefined);
    } else {
      onClickHandler(item.id);
      setSelectedParentCategoryId(item.id);
    }
  }, [isActive, onClickHandler, setSelectedParentCategoryId]);

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
