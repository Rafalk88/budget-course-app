import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { budget as APIBudget, common as APICommon } from 'data/fetch';

import { AddTransactionForm } from './AddTransactionForm';

export function AddTransactionView() {
  const { data: budget } = useQuery({
    queryKey: ['budget'],
    queryFn: () => APIBudget.fetchBudget({ id: 1 }),
  });
  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: APICommon.fetchAllCategories,
  });
  const { mutate } = useMutation({ mutationFn: APIBudget.addTransaction });
  const navigate = useNavigate();

  const handleSubmitAddTransaction = (values) => {
    const valuesWithDate = {
      ...values,
      date: new Date(),
      budgetId: budget.id,
    };

    mutate(
      { budgetId: budget.id, data: valuesWithDate },
      {
        onSuccess: () => navigate(-1),
      },
    );
  };

  return (
    <AddTransactionForm
      categories={allCategories}
      groupCategoriesBy="parentCategory.name"
      onSubmit={handleSubmitAddTransaction}
    />
  );
}

export default AddTransactionView;
