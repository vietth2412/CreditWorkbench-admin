import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import type { ListItemProps } from '@mui/material';
import { Box, Button, Collapse, ListItem } from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';

interface DocsNavItemProps extends ListItemProps {
  active?: boolean;
  children?: ReactNode;
  depth: number;
  icon?: ReactNode;
  info?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

export const DocsNavItem: FC<DocsNavItemProps> = (props) => {
  const { active, children, depth, icon, info, open: openProp, path, title, ...other } = props;
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 16;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  // Branch
  if (children) {
    return (
      <ListItem
        disableGutters
        sx={{
          display: 'block',
          py: 0
        }}
        {...other}
      >
        <Button
          endIcon={
            !open
              ? <ChevronRightIcon fontSize="small" />
              : <ChevronDownIcon fontSize="small" />
          }
          onClick={handleToggle}
          startIcon={icon}
          sx={{
            color: 'text.secondary',
            fontWeight: 'fontWeightMedium',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: '8px',
            py: '12px',
            textAlign: 'left',
            textTransform: 'none',
            width: '100%'
          }}
          variant="text"
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
          {info}
        </Button>
        <Collapse in={open}>
          {children}
        </Collapse>
      </ListItem>
    );
  }

  // Leaf
  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0
      }}
    >
      <NextLink
        href={path}
        passHref
      >
        <Button
          component={path ? 'a' : 'button'}
          startIcon={icon}
          sx={{
            color: 'text.secondary',
            fontWeight: 'fontWeightMedium',
            justifyContent: 'flex-start',
            textAlign: 'left',
            pl: `${paddingLeft}px`,
            pr: '8px',
            py: '12px',
            textTransform: 'none',
            width: '100%',
            ...(active && {
              color: 'primary.main',
              fontWeight: 'fontWeightBold',
              '& svg': {
                color: 'primary.main'
              }
            })
          }}
          variant="text"
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
          {info}
        </Button>
      </NextLink>
    </ListItem>
  );
};

DocsNavItem.defaultProps = {
  active: false,
  open: false
};

DocsNavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.node,
  info: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
