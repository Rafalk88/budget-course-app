/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectParentCategory as selectParentCategoryAction } from 'data/actions/budget.actions';

function Component({ item, onClickHandler, isActive, selectParentCategory }) {
  const handleClick = useCallback(() => {
    if (isActive) {
      onClickHandler(null);
      selectParentCategory(undefined);
    } else {
      onClickHandler(item.id);
      selectParentCategory(item.id);
    }
  }, [isActive, onClickHandler, selectParentCategory]);

  return (
    <div>
      <item.Trigger onClick={handleClick} />
      {isActive && item.children}
    </div>
  );
}

const mapDispatchToProps = {
  selectParentCategory: selectParentCategoryAction,
};

export const Item = connect(null, mapDispatchToProps)(Component);

Component.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  selectParentCategory: PropTypes.func.isRequired,
};
