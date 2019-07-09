import * as React from 'react';
import { observer } from 'mobx-react';
import MortgageInfoForm, { MortgageInfoValues } from './MortgageInfoForm';
import MortgageInfoQuickView from './MortgageInfoQuickView';
import MortgageInfo from '../classes/MortgageInfo';

interface MortgageInfoDisplayProps {
  mortgageInfo: MortgageInfo;
}

const MortgageInfoDisplay: React.SFC<MortgageInfoDisplayProps> = ({ mortgageInfo }) => {
  const handleFormSubmit = (values: MortgageInfoValues) => {
    mortgageInfo.update(values);
  };

  const handleFormReset = (values: MortgageInfoValues) => {
    mortgageInfo.update(values);
  };

  const handleFocus = () => {
    mortgageInfo.setEditing(true);
  };

  const handleBlur = () => {
    mortgageInfo.setEditing(false);
  };

  const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
    mortgageInfo[event.target.name] = event.target.value;
  };

  return (
    <div>
      <h2>Mortgage Info</h2>
      <MortgageInfoForm
        initialValues={{ ...mortgageInfo }}
        onSubmit={handleFormSubmit}
        onReset={handleFormReset}
        onFieldFocus={handleFocus}
        onFieldBlur={handleBlur}
        onChange={handleChange}
      />
      <MortgageInfoQuickView mortgageInfo={mortgageInfo} />
      <small>id: {mortgageInfo.getId()}</small>
    </div>
  );
};

export default observer(MortgageInfoDisplay);
