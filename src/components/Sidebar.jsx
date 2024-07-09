import React from 'react';
import Navitem from './Navitem';
import { Box, Typography } from '@mui/material';

const dropdownItems = [
  { name: 'Lead Contact'},
  { name: 'Deals'},
];

const hrItems = [
  { name: 'Employees'},
  { name: 'Leaves'},
];
const workItems = [
  { name: 'Contracts'},
  { name: 'Projects'},
];
const financeItems = [
  { name: 'Proposal'},
  { name: 'Invoices'},
];
const letterItems = [
  { name: 'Generate'},
  { name: 'Templates'},
];
const payrollItems = [
  { name: 'Payroll'},
  { name: 'Employee Salary'},
  { name: 'Reports'},
];
const purchaseItems = [
  { name: 'Vendor'},
  { name: 'Products'},
];
const recruitItems = [
  { name: 'Jobs'},
  { name: 'Skills'},
];
const reportItems = [
  { name: 'task report'},
  { name: 'Leave Report'},
];
const Sidebar = ({ type }) => {
  return (
    <Box
    sx={{
      width: 253,
      backgroundColor: '#405189',
      padding: 2,
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'scroll',
      color: 'white',
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#bfbfbf',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#405189', 
      },
    }}
  >
      <Navitem name="Dashboard" />
      <Navitem name="Leads">
        {dropdownItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Clients" />
      <Navitem name="HR">
        {hrItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Work">
        {workItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Finance">
        {financeItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Orders" />
      <Navitem name="Tickets" />
      <Navitem name="Events" />
      <Navitem name="Messages" />
      <Navitem name="Notice Board" />
      <Navitem name="Knowledge Base" />
      <Navitem name="Assets" />
      <Navitem name="Biolinks" />
      <Navitem name="Letter">
        {letterItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Payroll">
        {payrollItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Purchase">
        {purchaseItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="QR Code" />
      <Navitem name="Recruit">
        {recruitItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
      <Navitem name="Zoom Meetings" />
      <Navitem name="Reports">
        {reportItems.map((item, index) => (
          <Box
            key={index}
            sx={{
              padding: 1,
              marginLeft: 2,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            <Typography>{item.name}</Typography>
          </Box>
        ))}
      </Navitem>
    </Box>
  );
};

export default Sidebar;
