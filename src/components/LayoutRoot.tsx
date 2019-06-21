import * as React from 'react';
import layoutStyles from './LayoutRoot.module.scss';

interface LayoutRootProps {
  className?: string;
}

const LayoutRoot: React.SFC<LayoutRootProps> = ({ className, ...props }) => (
  <div className={`${className} ${layoutStyles.layoutRoot}`} {...props} />
);

export default LayoutRoot;
