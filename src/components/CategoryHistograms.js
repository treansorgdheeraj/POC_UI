import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

const CategoryHistograms = ({ filteredData }) => {
  const categories = [
    {
      label: 'Greeting and self identification & Closure',
      subCategories: [
        { name: 'Intro self', shortName: 'Intro self', index: 8, max: 5 },
        { name: 'Greeting', shortName: 'Greeting', index: 9, max: 5 },
        { name: 'Thank you', shortName: 'Thank you', index: 10, max: 5 },
      ],
      max: 15,
      subTotalColumn: 'Sub-total',
    },
    {
      label: 'CSM tone',
      subCategories: [
        { name: 'Listening skill', shortName: 'Listening skill', index: 12, max: 10 },
        { name: 'Clarity of speech', shortName: 'Clarity of speech', index: 13, max: 10 },
        { name: 'Avoid dead air', shortName: 'Avoid dead air', index: 14, max: 5 },
      ],
      max: 25,
      subTotalColumn: 'Sub-total_1',
    },
    {
      label: 'Correct & complete information',
      subCategories: [
        { name: 'State purpose', shortName: 'State purpose', index: 16, max: 5 },
        { name: 'Validate customer', shortName: 'Validate customer', index: 17, max: 5 },
        { name: 'Relevant response', shortName: 'Relevant response', index: 18, max: 10 },
      ],
      max: 20,
      subTotalColumn: 'Sub-total_2',
    },
    {
      label: 'Casual language',
      subCategories: [{ name: 'Avoid casual', shortName: 'Avoid casual', index: 20, max: 5 }],
      max: 5,
      subTotalColumn: 'Sub-total_3',
    },
    {
      label: 'Multiple Interruptions',
      subCategories: [{ name: 'Frequent interrupt', shortName: 'Frequent interrupt', index: 22, max: 10 }],
      max: 10,
      subTotalColumn: 'Sub-total_4',
    },
  ];

  const calculateAverageScores = (keys) => {
    const values = filteredData.map((d) => {
      return keys.map((key) => {
        const value = parseFloat(Object.values(d)[key.index]) || 0;
        console.log(`Key: ${key.name}, Index: ${key.index}, Value: ${value}`); // Debugging line
        return {
          key: key.name,
          value: value,
        };
      });
    }).flat();
    
    const averages = keys.map((key) => {
      const filteredValues = values.filter((v) => v.key === key.name).map((v) => v.value);
      const sum = filteredValues.reduce((acc, val) => acc + val, 0);
      return filteredValues.length > 0 ? sum / filteredValues.length : 0;
    });
    console.log("Calculated Averages for Keys:", keys, averages); // Debugging line
    return averages;
  };

  const getBackgroundColor = (score, max) => {
    const diff = max - score;
    const opacity = 1 - (diff / max);
    return `rgba(243, 156, 18, ${opacity})`; // Using the orange color from the palette with variable opacity
  };

  console.log("Filtered Data:", filteredData); // Debugging line

  return (
    <Grid container spacing={3} sx={{ marginTop: '40px' }}>
      {categories.map((category, index) => {
        const averageScores = calculateAverageScores(category.subCategories);
        const data = {
          labels: category.subCategories.map(subCategory => subCategory.shortName),
          datasets: [
            {
              label: 'Score',
              data: averageScores,
              backgroundColor: averageScores.map((score, i) => getBackgroundColor(score, category.subCategories[i].max)),
            },
          ],
        };

        const options = {
          scales: {
            x: {
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                font: {
                  size: 12,
                },
              },
            },
            y: {
              beginAtZero: true,
              max: Math.max(...category.subCategories.map(subCategory => subCategory.max)) + 1,
            },
          },
          plugins: {
            datalabels: {
              anchor: 'end',
              align: 'start',
              formatter: (value, context) => {
                const maxScore = category.subCategories[context.dataIndex].max;
                return `${value.toFixed(2)} / ${maxScore}`;
              },
              font: {
                size: 14, // Increased font size
              },
              color: '#fff', // White color for text
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.dataset.label || '';
                  const maxScore = category.subCategories[context.dataIndex].max;
                  return `${label}: ${context.raw} (Max: ${maxScore})`;
                },
              },
            },
          },
          maintainAspectRatio: false,
        };

        return (
          <Grid item xs={12} sm={6} key={index}>
            <Card sx={{ backgroundColor: '#ffecd1', boxShadow: 3, borderRadius: '8px', height: '500px' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#e74c3c', textAlign: 'center', marginBottom: '20px' }}>
                  {category.label}
                </Typography>
                <div style={{ height: '400px', padding: '10px' }}>
                  <Bar data={data} options={options} />
                </div>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CategoryHistograms;
