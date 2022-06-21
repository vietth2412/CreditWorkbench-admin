import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { SxProps } from '@mui/system';

const DemoPreviewRoot = styled('div')(
  (() => ({
    overflow: 'auto'
  }))
);

interface SectionPreviewProps {
  children: ReactNode;
  description?: string | ReactNode;
  title?: string | ReactNode;
  sx?: SxProps;
}

export const DemoPreview: FC<SectionPreviewProps> = (props) => {
  const { title, description, children, ...other } = props;

  return (
    <DemoPreviewRoot {...other}>
      <div>
        {typeof title === 'string' ? (
          <Typography
            color="textPrimary"
            variant="body1"
          >
            {title}
          </Typography>
        ) : title}
        {description && (
          <Box sx={{ mt: 0.5 }}>
            {typeof description === 'string' ? (
              <Typography
                color="textSecondary"
                variant="body2"
              >
                {description}
              </Typography>
            ) : description}
          </Box>
        )}
      </div>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </DemoPreviewRoot>
  );
};

DemoPreview.propTypes = {
  children: PropTypes.node.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};
