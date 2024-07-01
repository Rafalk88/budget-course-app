/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Item({ item, onClickHandler, isActive }) {
  const handleClick = () => {
    if (isActive) {
      onClickHandler(null);
    } else {
      onClickHandler(item.id);
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

Item.propTypes = {
  item: PropTypes.shape({}).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

TogglableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
