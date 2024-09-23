import React, { useMemo, useCallback, useContext } from 'react';
import { groupBy } from 'lodash';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { BudgetContext } from 'data/context';
import { budget as APIBudget, common as APICommon } from 'data/fetch';
import { formatCurrency, formatDate } from 'utils';
import { List, ListItem } from './BudgetTransactionList.css';

export function BudgetTransactionList() {
  const { data: budget } = useQuery({
    queryKey: ['budget'],
    queryFn: () => APIBudget.fetchBudget({ id: 1 }),
  });
  const { data: budgetedCategories } = useQuery({
    queryKey: ['budgetedCategories'],
    queryFn: () => APIBudget.fetchBudgetCategories({ id: 1 }),
  });
  const { data: allCategories } = useQuery({
    queryKey: ['allCategories'],
    queryFn: APICommon.fetchAllCategories,
  });
  const { selectedParentCategoryId } = useContext(BudgetContext.store);
  const { i18n } = useTranslation();
  const currentLanguage = useCallback(i18n.language, [i18n.language]);
  const filteredTransactionsBySelectedParentCategory = useMemo(() => {
    if (typeof selectedParentCategoryId === 'undefined') {
      return budget?.transactions;
    }

    if (selectedParentCategoryId === null) {
      return budget?.transactions.filter((innerTransaction) => {
        const hasBudgetCategory = budgetedCategories.some(
          (budgetedCategory) =>
            budgetedCategory.categoryId === innerTransaction.categoryId,
        );

        return !hasBudgetCategory;
      });
    }

    return budget?.transactions.filter((transaction) => {
      try {
        const searchedCategory = allCategories.find(
          (category) => category.id === transaction.categoryId,
        );
        const parentCategoryName = searchedCategory.parentCategory.name;

        return parentCategoryName === selectedParentCategoryId;
      } catch (tryError) {
        return false;
      }
    });
  }, [
    allCategories,
    budgetedCategories,
    selectedParentCategoryId,
    budget?.transactions,
  ]);
  const groupedTransactionsByDate = useMemo(
    () =>
      groupBy(filteredTransactionsBySelectedParentCategory, (transaction) =>
        new Date(transaction.date).getUTCDate(),
      ),
    [filteredTransactionsBySelectedParentCategory],
  );

  return (
    <List>
      {Object.entries(groupedTransactionsByDate).map(([key, operations]) => (
        <ListItem key={key}>
          <List>
            {operations.map((transaction) => (
              <ListItem key={transaction.id}>
                <span>{transaction.description}</span>
                <span>
                  {formatCurrency(transaction.amount, currentLanguage)}
                </span>
                <span>{formatDate(transaction.date, currentLanguage)}</span>
                <span>
                  {
                    (
                      allCategories.find(
                        (category) => category.id === transaction.categoryId,
                      ) || {}
                    ).name
                  }
                </span>
              </ListItem>
            ))}
          </List>
        </ListItem>
      ))}
    </List>
  );
}

export default BudgetTransactionList;
