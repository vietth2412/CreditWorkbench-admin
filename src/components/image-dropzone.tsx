import type { FC } from 'react';
import PropTypes from 'prop-types';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import { Avatar, Box, Button, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';
import { Upload as UploadIcon } from '../icons/upload';

interface ImageDropzoneProps extends DropzoneOptions {
  sx?: SxProps;
}

export const ImageDropzone: FC<ImageDropzoneProps> = (props) => {
  const { accept, maxFiles, maxSize, minSize, onDrop, sx } = props;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop
  });

  return (
    <Box
      sx={{
        alignItems: 'center',
        borderColor: (theme) => theme.palette.mode == 'light' ? 'neutral.200' : 'neutral.800',
        borderRadius: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        outline: 'none',
        width: '100%',
        py: 2,
        ...(isDragActive && {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover'
        }),
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'action.hover'
        },
        ...sx
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Avatar
        sx={{
          backgroundColor: 'rgba(238, 240, 242, 1)',
          color: 'text.secondary',
          height: 36,
          width: 36
        }}
      >
        <UploadIcon />
      </Avatar>
      <Button
        color="primary"
        variant="text"
      >
        Upload
      </Button>
      <Typography
        align="center"
        sx={{ color: 'text.secondary' }}
        variant="caption"
      >
        Select images
      </Typography>
    </Box>
  );
};

ImageDropzone.propTypes = {
  // @ts-ignore
  accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  onDrop: PropTypes.func,
  sx: PropTypes.object
};
