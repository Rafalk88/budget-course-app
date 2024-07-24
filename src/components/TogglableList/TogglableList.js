import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Item } from './Item';

export function TogglableList({ items, clickRef }) {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    clickRef.current = setSelectedItem;
  }, [clickRef, setSelectedItem]);

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
  clickRef: PropTypes.shape({ current: PropTypes.instanceOf(Function) }),
};
