// Pagination component
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PaginationBar = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        marginTop: 4,
        padding: 2,
      }}
    >
      <Button
        variant="outlined"
        size="small"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        startIcon={<ChevronLeftIcon />}
      >
        Previous
      </Button>

      <Typography variant="body2" sx={{ minWidth: 100 }}>
        Page {currentPage} of {totalPages}
      </Typography>

      <Button
        variant="outlined"
        size="small"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        endIcon={<ChevronRightIcon />}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationBar;
