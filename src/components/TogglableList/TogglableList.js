/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectParentCategory as selectParentCategoryAction } from 'data/actions/budget.actions';

function Component({ item, onClickHandler, isActive, selectParentCategory }) {
  const handleClick = () => {
    if (isActive) {
      onClickHandler(null);
      selectParentCategory(null);
    } else {
      onClickHandler(item.id);
      selectParentCategory(item.id);
    }
  };

  return (
    <div>
      <item.Trigger onClick={handleClick} />
      {isActive && item.children}
    </div>
  );
}

export function TogglableList({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onClickHandler={setSelectedItem}
          isActive={selectedItem === item.id}
        />
      ))}
    </>
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

TogglableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
