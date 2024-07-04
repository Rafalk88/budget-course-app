/* eslint-disable no-empty-pattern */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Form, Field } from 'react-final-form';

const required = (value) => (value ? undefined : 'Required');

export function AddTransactionForm({}) {
  return (
    <Form
      onSubmit={console.log}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field name="firstName" validate={required}>
            {({ input, meta }) => (
              <div>
                <label>First Name</label>
                <input {...input} type="text" placeholder="First Name" />
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
          <pre>{JSON.stringify(values, 0, 2)}</pre>
        </form>
      )}
    />
  );
}
