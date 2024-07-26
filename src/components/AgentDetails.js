import React from 'react';
import { Paper, Typography } from '@mui/material';

const getColorForValue = (value) => {
  if (value >= 0.75) return '#27ae60';
  if (value >= 0.5) return '#f39c12';
  return '#e74c3c';
};

const AgentDetails = ({ filteredData }) => (
  <Paper elevation={3} sx={{ maxHeight: '500px', overflowY: 'auto', padding: '20px' }}>
    <Typography variant="h6">Agent-wise Details</Typography>
    <table style={{ width: '100%', borderSpacing: '0 10px', borderCollapse: 'separate' }}>
      <thead>
        <tr style={{ backgroundColor: '#ecf0f1', boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)' }}>
          <th style={{ padding: '10px' }}>Agent ID</th>
          <th style={{ padding: '10px' }}>Call Sentiment</th>
          <th style={{ padding: '10px' }}>Enthusiasm</th>
          <th style={{ padding: '10px' }}>Empathy</th>
          <th style={{ padding: '10px' }}>Rude Behaviour</th>
          <th style={{ padding: '10px' }}>Identified Customer</th>
          <th style={{ padding: '10px' }}>Accurate Info</th>
          <th style={{ padding: '10px' }}>Call Clarity</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#fff' }}>
            <td style={{ padding: '10px' }}>{row.AgentID}</td>
            <td style={{ padding: '10px', color: getColorForValue(parseFloat(row.CallSentiment)) }}>{row.CallSentiment}</td>
            <td style={{ padding: '10px', color: getColorForValue(parseFloat(row.AgentEnthusiasm)) }}>{row.AgentEnthusiasm}</td>
            <td style={{ padding: '10px', color: getColorForValue(parseFloat(row.Empathy)) }}>{row.Empathy}</td>
            <td style={{ padding: '10px', color: row.RudeBehaviour === 'true' ? '#e74c3c' : '#27ae60' }}>{row.RudeBehaviour}</td>
            <td style={{ padding: '10px', color: row.IdentifiedCustomer === 'true' ? '#27ae60' : '#e74c3c' }}>{row.IdentifiedCustomer}</td>
            <td style={{ padding: '10px', color: row.AccurateInfo === 'true' ? '#27ae60' : '#e74c3c' }}>{row.AccurateInfo}</td>
            <td style={{ padding: '10px', color: getColorForValue(parseFloat(row.CallClarity)) }}>{row.CallClarity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Paper>
);

export default AgentDetails;
