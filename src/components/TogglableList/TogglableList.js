import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Item } from './Item';

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

TogglableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
