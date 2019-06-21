import * as React from 'react';
import containerStyles from './Container.module.scss';

interface ContainerProps {
  className?: string;
}

const Container: React.SFC<ContainerProps> = ({ className, ...props }) => (
  <div className={`${className} ${containerStyles.container}`} {...props} />
);

export default Container;
