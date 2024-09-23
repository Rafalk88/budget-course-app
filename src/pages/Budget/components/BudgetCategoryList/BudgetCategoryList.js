/* eslint-disable react/no-unstable-nested-components */
import React, { useRef, useMemo, useCallback, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { groupBy } from 'lodash';
import PropTypes from 'prop-types';

import { BudgetContext } from 'data/context';
import { TogglableList } from 'components';
import { useTranslation } from 'react-i18next';
import { budget as APIBudget, common as APICommon } from 'data/fetch';
import { SELECT_PARENT_CATEGORY_ID } from 'data/constants';
import { ParentCategory } from './ParentCategory';
import { CategoryItem } from './CategoryItem';
import { Header, Footer } from './BudgetCategoryList.css';

export function BudgetCategoryList() {
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
  const { dispatch } = useContext(BudgetContext.store);
  const { t } = useTranslation();
  const handleClickParentCategoryRef = useRef(null);
  const handleCleatParentCategorySelect = useCallback(() => {
    dispatch({ type: SELECT_PARENT_CATEGORY_ID, payload: undefined });
    handleClickParentCategoryRef.current(null);
  }, [dispatch, handleClickParentCategoryRef]);
  const handleRestParentCategorySelect = useCallback(() => {
    dispatch({ type: SELECT_PARENT_CATEGORY_ID, payload: null });
    handleClickParentCategoryRef.current(null);
  }, [dispatch, handleClickParentCategoryRef]);
  const budgetedCategoriesByParent = useMemo(
    () =>
      groupBy(
        budgetedCategories,
        (item) =>
          allCategories.find((category) => category.id === item.categoryId)
            .parentCategory.name,
      ),
    [budgetedCategories, allCategories],
  );
  const listItems = useMemo(
    () =>
      Object.entries(budgetedCategoriesByParent).map(
        ([parentName, categories]) => {
          function Trigger({ onClick }) {
            return (
              <ParentCategory
                key={parentName}
                name={parentName}
                categories={categories}
                transactions={budget?.transactions}
                onClick={() => {
                  onClick(parentName);
                }}
              />
            );
          }

          Trigger.propTypes = {
            onClick: PropTypes.func.isRequired,
          };

          return {
            id: parentName,
            Trigger,
            children: categories.map((budgetedCategory) => {
              const { name } = allCategories.find(
                (category) => category.id === budgetedCategory.categoryId,
              );
              return (
                <CategoryItem
                  key={budgetedCategory.id}
                  name={name}
                  item={budgetedCategory}
                  transactions={budget?.transactions}
                />
              );
            }),
          };
        },
      ),
    [budgetedCategoriesByParent, allCategories, budget?.transactions],
  );

  const totalSpent = useMemo(
    () =>
      budget?.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      ),
    [budget?.transactions],
  );
  const restToSpent = useMemo(
    // eslint-disable-next-line no-unsafe-optional-chaining
    () => budget?.totalAmount - totalSpent,
    [budget?.totalAmount, totalSpent],
  );
  const amountTaken = useMemo(
    () =>
      budgetedCategories?.reduce((acc, budgetedCategory) => {
        const categoryTransactions = budget?.transactions.filter(
          (transaction) => transaction.categoryId === budgetedCategory.id,
        );
        const categoryExpenses = categoryTransactions.reduce(
          (accNested, transaction) => accNested + transaction.amount,
          0,
        );

        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
      }, 0),
    [budget?.transactions, budgetedCategories],
  );
  const notBudgetedTransactions = budget?.transactions.filter(
    (transaction) =>
      !budgetedCategories.find(
        (budgetedCategory) => budgetedCategory.id === transaction.categoryId,
      ),
  );
  const notBudgetedExpenses = useMemo(
    () =>
      notBudgetedTransactions?.reduce(
        (acc, transaction) => acc + transaction.amount,
        0,
      ),
    [notBudgetedTransactions],
  );
  const avaiableForRestCategories = useMemo(
    // eslint-disable-next-line no-unsafe-optional-chaining
    () => budget?.totalAmount - amountTaken - notBudgetedExpenses,
    [budget?.totalAmount, amountTaken, notBudgetedExpenses],
  );

  return (
    <>
      <Header>
        <ParentCategory
          name={budget?.name}
          amount={restToSpent}
          onClick={handleCleatParentCategorySelect}
        />
      </Header>
      <TogglableList
        items={listItems}
        clickRef={handleClickParentCategoryRef}
      />
      <Footer>
        <ParentCategory
          name={t(`parentCategory.${'Othercategories'.replace(/\s/g, '')}`)}
          amount={avaiableForRestCategories}
          onClick={handleRestParentCategorySelect}
        />
      </Footer>
    </>
  );
}

export default BudgetCategoryList;
