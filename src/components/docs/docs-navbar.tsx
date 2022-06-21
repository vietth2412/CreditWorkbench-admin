import type { FC } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import { Menu as MenuIcon } from '../../icons/menu';
import { Logo } from '../logo';

interface DocsNavbarProps {
  onOpenSidebar?: () => void;
}

export const DocsNavbar: FC<DocsNavbarProps> = (props) => {
  const { onOpenSidebar } = props;

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: 'primary.700',
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        boxShadow: 'none',
        color: '#ffffff'
      }}
    >
      <Toolbar sx={{ height: 64 }}>
        <NextLink
          href="/"
          passHref
        >
          <a>
            <Logo variant="light" />
          </a>
        </NextLink>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          onClick={onOpenSidebar}
          sx={{
            display: {
              lg: 'none'
            }
          }}
        >
          <MenuIcon fontSize="small" />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

DocsNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
