/* eslint-disable react/button-has-type */
import * as React from 'react';
import { Formik, FormikErrors } from 'formik';
import Form from './Form';
import Field from './Field';
import mortgageInfoFormStyles from './MortgageInfoForm.module.scss';

export interface MortgageInfoValues {
  interestRate: number;
  mortgageInsuranceRate: number;
  term: number;
  principal: number;
}

interface MortgageInfoFormProps {
  initialValues: MortgageInfoValues;
  onSubmit: (values: MortgageInfoValues) => void;
  onReset: (values: MortgageInfoValues) => void;
  onFieldFocus: (event: React.FocusEvent<HTMLFormElement>) => void;
  onFieldBlur: (event: React.FocusEvent<HTMLFormElement>) => void;
  onChange: (event: React.FormEvent<HTMLFormElement>) => void;
}

const MortgageInfoForm: React.SFC<MortgageInfoFormProps> = ({ initialValues, onSubmit, onReset, onFieldFocus, onFieldBlur, onChange }) => {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values: MortgageInfoValues) => {
        const errors: FormikErrors<MortgageInfoValues> = {};
        const numRate = Number(values.interestRate);
        if (Number.isNaN(numRate)) {
          errors.interestRate = 'required';
        } else if (numRate > 1 || numRate <= 0) {
          errors.interestRate = 'enter a number between 1 and 0 exclusive';
        }
        return errors;
      }}
      onSubmit={(values: MortgageInfoValues, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
      onReset={onReset}
    >
      {({ isSubmitting }) => (
        <Form className={mortgageInfoFormStyles.form} onFocus={onFieldFocus} onBlur={onFieldBlur} onChange={onChange}>
          <div className={mortgageInfoFormStyles.form__fields}>
            <Field
              label="Annual Interest Rate"
              name="interestRate"
              type="number"
              min="0.0001"
              step="0.0001"
              max="1"
              placeholder="Annual Interest Rate"
            />
            <Field label="Term in months" name="term" type="number" min="0" placeholder="Term in months" />
            <Field label="Principal" name="principal" type="number" min="0" step="1000" placeholder="Principal" />
            <Field
              label="Mortgage Insurance Rate"
              name="mortgageInsuranceRate"
              type="number"
              min="0.0000"
              step="0.0001"
              max="1"
              placeholder="Mortgage Insurance Rate"
            />
          </div>
          <div className={mortgageInfoFormStyles.form__buttons}>
            <button type="reset" disabled={isSubmitting}>
              Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default MortgageInfoForm;
