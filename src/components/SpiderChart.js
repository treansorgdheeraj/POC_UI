import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Radar } from 'react-chartjs-2';

const SpiderChart = ({ radarData }) => (
  <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
    <Typography variant="h6">Overall Sentiment</Typography>
    {radarData && <Radar data={radarData} />}
  </Paper>
);

export default SpiderChart;
