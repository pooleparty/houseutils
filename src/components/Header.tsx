import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';
import Container from './Container';
import headerStyles from './Header.module.scss';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.SFC<HeaderProps> = ({ title, className, ...props }) => (
  <div className={classNames(className, headerStyles.header)} {...props}>
    <Container className={headerStyles.headerInner}>
      <Link className={classNames(headerStyles.homepageLink, headerStyles.link)} to="/">
        {title}
      </Link>
      <Link className={headerStyles.link} to="/affordability">
        Affordability Calculator
      </Link>
    </Container>
  </div>
);

export default Header;
