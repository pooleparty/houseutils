import * as React from 'react';
import { Formik } from 'formik';
import { observer } from 'mobx-react';
import affordabilityCalculatorStyles from './AffordabilityCalculator.module.scss';
import Form from './Form';
import Field from './Field';
import AffordabilityModel from '../classes/AffordabilityModel';
import { AppState } from '../classes/AppState';
import context from '../appContext';

interface AffordabilityCalculatorProps {
  className?: string;
}

const AffordabilityCalculator: React.SFC<AffordabilityCalculatorProps> = ({ className, ...props }) => {
  const appState: AppState = React.useContext(context);

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    appState.affordabilityModel[event.target.name] = event.target.type === 'number' ? Number(event.target.value) : event.target.value;
  };

  return (
    <div className={`${className} ${affordabilityCalculatorStyles.container}`} {...props}>
      <Formik
        initialValues={appState.affordabilityModel}
        onSubmit={(values: AffordabilityModel, { setSubmitting }) => {
          console.table(values);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form onChange={handleChange}>
            <div>
              <Field label="Monthly Gross Income" name="monthlyGrossIncome" type="number" min="0" placeholder="Monthly Gross Income" />
              <Field label="Down Payment" name="downPayment" type="number" min="0" placeholder="Down Payment" />
              <Field label="Monthly Debts" name="monthlyDebts" type="number" min="0" placeholder="Monthly Debts" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <pre>
        <code>{JSON.stringify(appState.affordabilityModel.toJSON, null, 2)}</code>
      </pre>
    </div>
  );
};
export default observer(AffordabilityCalculator);
