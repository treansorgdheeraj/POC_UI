import React from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Filters = ({ timeFilter, setTimeFilter, levelFilter, setLevelFilter, levelValue, setLevelValue, dropdownValues, applyFilters }) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Time Filter</InputLabel>
          <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} label="Time Filter">
            <MenuItem value={'Last 7 days'}>Last 7 days</MenuItem>
            <MenuItem value={'Last 1 Month'}>Last 1 Month</MenuItem>
            <MenuItem value={'Last 1 Year'}>Last 1 Year</MenuItem>
            <MenuItem value={'Last 5 Years'}>Last 5 Years</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>Level Filter</InputLabel>
          <Select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} label="Level Filter">
            <MenuItem value={'Enterprise'}>Enterprise</MenuItem>
            <MenuItem value={'Team'}>Team</MenuItem>
            <MenuItem value={'Agent'}>Agent</MenuItem>
            <MenuItem value={'CallID'}>Call ID</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3}>
        <FormControl fullWidth>
          <InputLabel>{levelFilter === 'Enterprise' ? 'Enterprise ID' : levelFilter === 'Team' ? 'Team ID' : levelFilter === 'Agent' ? 'Agent ID' : 'Call ID'}</InputLabel>
          <Select value={levelValue} onChange={(e) => setLevelValue(e.target.value)} label={levelFilter === 'Enterprise' ? 'Enterprise ID' : levelFilter === 'Team' ? 'Team ID' : levelFilter === 'Agent' ? 'Agent ID' : 'Call ID'}>
            {dropdownValues.map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={3} display="flex" alignItems="center" justifyContent="center">
        <Button variant="contained" color="primary" onClick={applyFilters} sx={{ backgroundColor: '#d4763b', height: '56px', width: '100%' }}>Go</Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
