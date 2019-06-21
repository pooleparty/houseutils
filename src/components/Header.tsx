import * as React from 'react';
import { Link } from 'gatsby';
import Container from './Container';
import headerStyles from './Header.module.scss';

interface HeaderProps {
  title: string;
  className?: string;
}

const Header: React.SFC<HeaderProps> = ({ title, className, ...props }) => (
  <div className={`${className} ${headerStyles.header}`} {...props}>
    <Container className={headerStyles.headerInner}>
      <Link className={headerStyles.homepageLink} to="/">
        {title}
      </Link>
    </Container>
  </div>
);

export default Header;
