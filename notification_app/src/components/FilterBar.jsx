import React from 'react';
import { Box, FormControl, Select, MenuItem } from '@mui/material';

const FilterBar = ({
  selectedType,
  onTypeChange,
}) => {
  const notificationTypes = [
    { value: 'All', label: 'All Notifications' },
    { value: 'Placement', label: 'Placements' },
    { value: 'Result', label: 'Results' },
    { value: 'Event', label: 'Events' },
  ];

  return (
    <Box
      sx={{
        marginBottom: 2,
        padding: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <Select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
          }}
        >
          {notificationTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
