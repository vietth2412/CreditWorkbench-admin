import type { FC } from 'react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography
} from '@mui/material';
import type { SxProps } from '@mui/system';

interface LanguagePopoverProps {
  language: string;
  onLanguageChange: (newLanguage: 'en' | 'des' | 'es') => void;
  sx?: SxProps;
}

const languageOptions = {
  en: {
    icon: '/static/uk_flag.svg',
    label: 'English'
  },
  de: {
    icon: '/static/de_flag.svg',
    label: 'German'
  },
  es: {
    icon: '/static/es_flag.svg',
    label: 'Spanish'
  }
};

export const LanguagePopover: FC<LanguagePopoverProps> = (props) => {
  const { language, onLanguageChange, ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLanguageChange = (newLanguage: 'en' | 'des' | 'es'): void => {
    onLanguageChange(newLanguage);
    setOpen(false);
  };

  const selectedOption = languageOptions[language];

  return (
    <>
      <IconButton
        onClick={handleOpen}
        ref={anchorRef}
        {...other}
      >
        <Box
          sx={{
            display: 'flex',
            height: 20,
            width: 20,
            '& img': {
              width: '100%'
            }
          }}
        >
          <img
            alt={selectedOption.label}
            src={selectedOption.icon}
          />
        </Box>
      </IconButton>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'bottom'
        }}
        keepMounted
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: { width: 240 }
        }}
      >
        {Object.keys(languageOptions).map((option: 'en' | 'des' | 'es') => (
          <MenuItem
            onClick={() => handleLanguageChange(option)}
            key={option}
          >
            <ListItemIcon>
              <Box
                sx={{
                  display: 'flex',
                  height: 20,
                  width: 20,
                  '& img': {
                    width: '100%'
                  }
                }}
              >
                <img
                  alt={languageOptions[option].label}
                  src={languageOptions[option].icon}
                />
              </Box>
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography
                  color="textPrimary"
                  variant="subtitle2"
                >
                  {languageOptions[option].label}
                </Typography>
              )}
            />
          </MenuItem>
        ))}
      </Popover>
    </>
  );
};

LanguagePopover.propTypes = {
  language: PropTypes.string.isRequired,
  onLanguageChange: PropTypes.func.isRequired
};
