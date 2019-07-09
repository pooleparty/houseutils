import * as React from 'react';
import classNames from 'classnames';
import layoutStyles from './LayoutRoot.module.scss';
import { Provider } from '../appContext';
import { AppState } from '../classes/AppState';

interface LayoutRootProps {
  className?: string;
}

const LayoutRoot: React.SFC<LayoutRootProps> = ({ className, ...props }) => (
  <Provider value={new AppState()}>
    <div className={classNames(className, layoutStyles.layoutRoot)} {...props} />
  </Provider>
);

export default LayoutRoot;
