import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export function Budget({ fetchBudget, fetchBudgetedCategories }) {
  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      fetchBudget(1);
      fetchBudgetedCategories(1);
    } else {
      firstRender.current = true;
    }
  }, [fetchBudget]);

  return <div>Budget</div>;
}

Budget.propTypes = {
  fetchBudget: PropTypes.func.isRequired,
  fetchBudgetedCategories: PropTypes.func.isRequired,
};
