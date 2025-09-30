import { forwardRef } from 'react';
import { type NavLinkProps, NavLink as RouterNavLink } from 'react-router';

export interface LocalizedNavLinkProps extends NavLinkProps {
  to: string;
}

export const LocalizedNavLink = forwardRef<HTMLAnchorElement, LocalizedNavLinkProps>(
  (props, ref) => {
    return <RouterNavLink ref={ref} {...props} />;
  }
);

LocalizedNavLink.displayName = 'LocalizedNavLink';
