import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

const GaugeChartComponent = ({ title, data, id }) => (
  <Card sx={{ backgroundColor: '#ffecd1', boxShadow: 3, borderRadius: '8px', height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Typography variant="h5" sx={{ color: '#e74c3c' }}>{title}</Typography>
      {data.length > 0 ? (
        <div style={{ position: 'relative', width: '100%', height: '200px' }}>
          <GaugeChart
            id={id}
            nrOfLevels={20}
            percent={data.reduce((sum, d) => sum + parseFloat(d), 0) / data.length / 10}  // Adjusted to match the sub-total scale
            textColor="#27ae60"
            colors={['#e74c3c', '#f39c12', '#27ae60']}
            arcWidth={0.3}
          />
        </div>
      ) : (
        <Typography variant="h6" sx={{ color: '#27ae60', marginTop: '10px' }}>N/A</Typography>
      )}
    </CardContent>
  </Card>
);

export default GaugeChartComponent;
