import * as React from 'react';
import classNames from 'classnames';
import pageStyles from './Page.module.scss';

interface PageProps {
  className?: string;
}

const Page: React.SFC<PageProps> = ({ className, ...props }) => <div className={classNames(className, pageStyles.page)} {...props} />;

export default Page;
