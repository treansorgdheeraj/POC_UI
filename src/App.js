import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import Papa from 'papaparse';


import 'chartjs-adapter-date-fns';
import Header from './components/Header';
import Filters from './components/Filters';
import GaugeCharts from './components/GaugeCharts';
import CallAudioPlayer from './components/CallAudioPlayer';
import CallDetailsTable from './components/CallDetailsTable';
import CategoryHistograms from './components/CategoryHistograms';

import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, CategoryScale, RadialLinearScale, BarElement, Tooltip, Legend, TimeScale } from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, RadialLinearScale, BarElement, Tooltip, Legend, TimeScale);

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('Last 7 days');
  const [levelFilter, setLevelFilter] = useState('Enterprise');
  const [levelValue, setLevelValue] = useState('');
  const [dropdownValues, setDropdownValues] = useState([]);

  useEffect(() => {
    fetch('/call_kpi_data.csv')
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: results => {
            console.log("Parsed CSV Data:", results.data);
            const actualData = results.data;
            setData(actualData);
          },
        });
      })
      .catch(error => console.error('Error fetching CSV:', error));
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      console.log('Level Filter Changed:', levelFilter);
      console.log('Data:', data);

      let values = [];
      if (levelFilter === 'Enterprise') {
        values = [...new Set(data.map(d => d['EnterpriseID']))];
      } else if (levelFilter === 'Team') {
        values = [...new Set(data.map(d => d['TeamID']))];
      } else if (levelFilter === 'Agent') {
        values = [...new Set(data.map(d => d['AgentID']))];
      } else if (levelFilter === 'CallID') {
        values = [...new Set(data.map(d => d['Call ID']))];
      }
      console.log('Extracted Dropdown Values:', values);
      setDropdownValues(values);
      setLevelValue('');
    }
  }, [levelFilter, data]);

  useEffect(() => {
    console.log('Dropdown Values Updated:', dropdownValues);
  }, [dropdownValues]);

  const applyFilters = () => {
    if (!data || data.length === 0) {
      console.log('No data available for filtering');
      setFilteredData([]);
      return;
    }

    let filtered = [...data];

    const now = new Date();
    let startDate;
    switch (timeFilter) {
      case 'Last 7 days':
        startDate = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 1 Month':
        startDate = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 1 Year':
        startDate = new Date(now.getTime() - (365 * 24 * 60 * 60 * 1000));
        break;
      case 'Last 5 Years':
        startDate = new Date(now.getTime() - (5 * 365 * 24 * 60 * 60 * 1000));
        break;
      default:
        startDate = new Date('1970-01-01');
    }

    filtered = filtered.filter(d => {
      if (d.Date) {
        console.log(`Parsing date: ${d.Date}`);
        const [day, month, year] = d.Date.split('-');
        const callDate = new Date(`${year}-${month}-${day}`);
        console.log(`Parsed date: ${callDate}`);
        return callDate >= startDate;
      }
      return false;
    });

    if (levelFilter === 'Enterprise') {
      filtered = filtered.filter(d => d.EnterpriseID === levelValue);
    } else if (levelFilter === 'Team') {
      filtered = filtered.filter(d => d.TeamID === levelValue);
    } else if (levelFilter === 'Agent') {
      filtered = filtered.filter(d => d.AgentID === levelValue);
    } else if (levelFilter === 'CallID') {
      filtered = filtered.filter(d => d['Call ID'] === levelValue);
    }

    console.log('Filtered Data:', filtered);
    setFilteredData(filtered);
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f3f4f6', boxShadow: 3 }}>
      <Container sx={{ backgroundColor: '#ffffff', padding: '20px', boxShadow: 3, borderRadius: '8px' }}>
        <Header />
        <Box sx={{ margin: '20px 0', padding: '20px', backgroundColor: '#ffecd1', borderRadius: '0 0 8px 8px', boxShadow: 3 }}>
          <Filters 
            timeFilter={timeFilter} 
            setTimeFilter={setTimeFilter} 
            levelFilter={levelFilter} 
            setLevelFilter={setLevelFilter} 
            levelValue={levelValue} 
            setLevelValue={setLevelValue} 
            dropdownValues={dropdownValues} 
            applyFilters={applyFilters} 
          />
        </Box>
        <CallAudioPlayer filteredData={filteredData} />
        <Grid container spacing={3} sx={{ marginBottom: '40px', marginTop: '20px' }}>
          <GaugeCharts filteredData={filteredData} />
        </Grid>
        {/* <CallDetailsTable filteredData={filteredData} /> */}
        <Box sx={{ marginBottom: '20px' }}>
            <CategoryHistograms filteredData={filteredData} />
        </Box>
      </Container>
    </Box>
  );
};

export default App;
