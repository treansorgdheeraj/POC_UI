import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const DataTable = ({ filteredData }) => {
  if (!filteredData || filteredData.length === 0) {
    return <Typography>No data available for the selected filters.</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px', overflowX: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {Object.keys(filteredData[0]).map((header, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{ backgroundColor: '#ffecd1', color: '#e74c3c', fontWeight: 'bold', border: '1px solid #ccc' }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {Object.keys(row).map((key, cellIndex) => (
                <TableCell key={cellIndex} align="center" sx={{ border: '1px solid #ccc' }}>
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
