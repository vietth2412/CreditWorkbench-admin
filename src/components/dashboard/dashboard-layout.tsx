import type { FC } from 'react';
import PropTypes from 'prop-types';
import type { Theme } from '@mui/material';
import { Box, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Footer } from '../footer';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useSettings } from '../../contexts/settings-context';

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
    }
  })
);

export const DashboardLayout: FC = (props) => {
  const { children } = props;
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { settings, saveSettings } = useSettings();

  const handlePinSidebar = (): void => {
    saveSettings({
      ...settings,
      pinSidebar: !settings.pinSidebar
    });
  };

  return (
    <>
      <DashboardNavbar />
      {!mdDown && (
        <DashboardSidebar
          onPin={handlePinSidebar}
          pinned={settings.pinSidebar}
        />
      )}
      <DashboardLayoutRoot
        sx={{
          pl: {
            md: settings.pinSidebar ? '270px' : '73px'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
          <Footer />
        </Box>
      </DashboardLayoutRoot>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node
};
