import * as React from 'react';
import classNames from 'classnames';
import layoutMainStyles from './LayoutMain.module.scss';

interface LayoutMainProps {
  className?: string;
}

const LayoutMain: React.SFC<LayoutMainProps> = ({ className, ...props }) => {
  return <div className={classNames(className, layoutMainStyles.layoutMain)} {...props}></div>;
};

export default LayoutMain;
