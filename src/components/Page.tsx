import * as React from 'react';
import pageStyles from './Page.module.scss';

interface PageProps {
  className?: string;
}

const Page: React.SFC<PageProps> = ({ className, ...props }) => <div className={`${className} ${pageStyles.page}`} {...props} />;

export default Page;
