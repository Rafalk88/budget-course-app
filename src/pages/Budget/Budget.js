import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export function Budget({
  budget,
  fetchBudget,
  fetchBudgetedCategories,
  fetchAllCategories,
}) {
  const firstRender = useRef(false);

  useEffect(() => {
    if (firstRender.current) {
      fetchBudget(1);
      fetchBudgetedCategories(1);
      fetchAllCategories();
      console.log(budget);
    } else {
      firstRender.current = true;
    }
  }, [fetchBudget, fetchBudgetedCategories, fetchAllCategories]);

  return <div>Budget</div>;
}

Budget.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  budget: PropTypes.any.isRequired,
  fetchBudget: PropTypes.func.isRequired,
  fetchBudgetedCategories: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
};
