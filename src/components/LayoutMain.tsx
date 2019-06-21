import * as React from 'react';
import layoutMainStyles from './LayoutMain.module.scss';

interface LayoutMainProps {
  className?: string;
}

const LayoutMain: React.SFC<LayoutMainProps> = ({ className, ...props }) => (
  <div className={`${className} ${layoutMainStyles.layoutMain}`} {...props} />
);

export default LayoutMain;
