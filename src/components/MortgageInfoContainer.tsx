import { observer } from 'mobx-react';
import * as React from 'react';
import mortgageInfoContainerStyles from './MortgageInfoContainer.module.scss';
import MortgageInfoDisplay from './MortgageInfoDisplay';
import { AppState } from '../classes/AppState';
import context from '../appContext';

const MortgageInfoContainer: React.SFC = () => {
  const appState: AppState = React.useContext(context);

  if (!appState) {
    return null;
  }

  return (
    <div>
      <div className={mortgageInfoContainerStyles.mortgageInfoContainer}>
        {appState.getMortgageInfos().map(mortgageInfo => {
          return (
            <div className={mortgageInfoContainerStyles.mortgageInfo} key={mortgageInfo.getId()}>
              <MortgageInfoDisplay mortgageInfo={mortgageInfo} />
              <button type="button" onClick={mortgageInfo.delete}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <button type="button" onClick={appState.addMortgageInfo}>
        Add Mortgage Info
      </button>
    </div>
  );
};

export default observer(MortgageInfoContainer);
