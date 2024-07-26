import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const KPIBarGraph = ({ barData, dataLabelsPlugin }) => (
  <Paper elevation={3} sx={{ padding: '20px', height: '500px' }}>
    <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '10px' }}>Correctness of Call</Typography>
    <div style={{ height: '450px', width: '100%' }}>
      {barData && (
        <Bar 
          data={barData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: false,
                display: true,
                grid: {
                  display: false
                },
                ticks: {
                  maxRotation: 0,
                  minRotation: 0,
                  font: {
                    size: 12
                  }
                }
              },
              y: {
                stacked: false,
                display: false,
                beginAtZero: true,
                suggestedMax: 12,
                grid: {
                  display: false
                }
              }
            },
            plugins: {
              legend: {
                display: true,
                position: 'top',
                labels: {
                  padding: 20
                }
              },
              tooltip: {
                enabled: true
              },
              dataLabels: {
                display: true,
                color: 'black',
                align: 'end',
                anchor: 'end'
              }
            }
          }} 
          plugins={[dataLabelsPlugin]}
        />
      )}
    </div>
  </Paper>
);

export default KPIBarGraph;
