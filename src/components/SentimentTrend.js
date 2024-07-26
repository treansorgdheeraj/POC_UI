import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

const SentimentTrend = ({ kpiData }) => (
  <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
    <Typography variant="h6">Sentiment Trend</Typography>
    {kpiData && (
      <Line
        data={kpiData}
        options={{
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'MMM dd, yyyy',
                displayFormats: {
                  day: 'MMM dd, yyyy'
                }
              },
              ticks: {
                maxTicksLimit: 5,
                autoSkip: true
              }
            }
          }
        }}
      />
    )}
  </Paper>
);

export default SentimentTrend;
