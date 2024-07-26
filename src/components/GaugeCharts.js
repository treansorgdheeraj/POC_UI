import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import GaugeChart from 'react-gauge-chart';

const GaugeCharts = ({ filteredData }) => {
  if (!filteredData || filteredData.length === 0) {
    console.log('No filtered data available');
    return <Typography>No data available for the selected filters.</Typography>;
  }

  const categories = [
    {
      label: 'Greeting and self identification & Closure (Max: 15)',
      key: 'Sub-total',
      max: 15
    },
    {
      label: 'CSM tone (Max: 25)',
      key: 'Sub-total_1',
      max: 25
    },
    {
      label: 'Correct & complete information (Max: 20)',
      key: 'Sub-total_2',
      max: 20
    },
    {
      label: 'Casual language (Max: 5)',
      key: 'Sub-total_3',
      max: 5
    },
    {
      label: 'Multiple Interruptions (Max: 10)',
      key: 'Sub-total_4',
      max: 10
    }
  ];

  const calculateAverage = (key) => {
    const values = filteredData
      .map(d => parseFloat(d[key]))
      .filter(val => !isNaN(val));

    if (values.length === 0) {
      console.log(`No valid values for key: ${key}`);
      return 0;
    }

    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  };

  console.log('Filtered Data:', filteredData);

  return (
    <Grid container spacing={3} sx={{ marginLeft: 0, marginRight: 0 }}>
      {categories.map((category, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Card sx={{ backgroundColor: '#ffecd1', boxShadow: 3, borderRadius: '8px', width: '100%', height: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CardContent sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
              <Typography variant="h6" sx={{ color: '#e74c3c' }}>{category.label}</Typography>
              {filteredData.length > 0 && (
                <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                  <GaugeChart
                    id={`${category.key}-gauge`}
                    nrOfLevels={category.max}
                    percent={calculateAverage(category.key) / category.max}
                    textColor="#27ae60"
                    colors={['#e74c3c', '#f39c12', '#27ae60']}
                    arcWidth={0.3}
                    style={{ width: '100%', height: '100%' }}
                    hideText={false}
                  />
                  <Typography variant="h6" sx={{ color: '#27ae60', marginTop: '10px' }}>{calculateAverage(category.key).toFixed(2)} / {category.max}</Typography>
                </div>
              )}
              {filteredData.length === 0 && <Typography variant="h6" sx={{ color: '#27ae60', marginTop: '10px' }}>N/A</Typography>}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default GaugeCharts;
