import * as React from 'react';
import { Field as FormikField, FieldProps as FormikFieldProps, ErrorMessage } from 'formik';
import fieldStyles from './Field.module.scss';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledField: React.SFC<FormikFieldProps> = ({ field, form, ...props }) => {
  return (
    <React.Fragment>
      <input type="text" className={fieldStyles.input} {...field} {...props} />
      <ErrorMessage name={field.name} />
    </React.Fragment>
  );
};

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Field: React.SFC<FieldProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      <label htmlFor={props.name}>
        <span className={fieldStyles.label}>{label}</span>
      </label>
      <FormikField className={fieldStyles.field} {...props} component={StyledField} />
    </div>
  );
};

export default Field;
