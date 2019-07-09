import * as React from 'react';
import { Form as FormikForm } from 'formik';

const Form: React.SFC<React.FormHTMLAttributes<HTMLFormElement>> = ({ ...props }) => {
  return <FormikForm {...props} />;
};

export default Form;
