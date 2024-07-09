/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

const required = (value) => (value ? undefined : 'Required');

export function AddTransactionForm({ allCategories }) {
  return (
    <Form
      onSubmit={console.log}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field name="description" validate={required}>
            {({ input, meta }) => (
              <div>
                <label htmlFor={input.name}>Description</label>
                <input
                  {...input}
                  type="text"
                  placeholder="Description"
                  id={input.name}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field
            name="amount"
            validate={required}
            parse={(value) => parseFloat(value, 10)}
          >
            {({ input, meta }) => (
              <div>
                <label htmlFor={input.name}>Amount</label>
                <input
                  {...input}
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Amount"
                  id={input.name}
                />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Field name="category">
            {({ input, meta }) => (
              <div>
                <label htmlFor={input.name}>Category</label>
                <select
                  {...input}
                  id={input.name}
                  onChange={(event) => {
                    const value = event.target.value || '';
                    input.onChange(value);
                  }}
                >
                  <option value="">Wybierz opcję</option>
                  {allCategories.map((category) => {
                    return (
                      <option
                        key={category.id}
                        value={category.parentCategoryId}
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
}

AddTransactionForm.propTypes = {
  allCategories: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};
