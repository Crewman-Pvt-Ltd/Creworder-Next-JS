import React from 'react';
import Navitem from './Navitem';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const dropdownItems = [
  { name: 'Lead Contact'},
  { name: 'Deals'},
];
// const companyItems = [
//   { name: 'Company List' },
//   { name: 'Add new', path: '/superadmin/company' }, 
// ];
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
  const router = useRouter();

  const handleItemClick = (path) => {
    if (path) {
      router.push(path);
    }
  };

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
          width: '6px',
        
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c9c9c9',
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#405189',
        },
      }}
    >

<Navitem name="Dashboard" onClick={() => handleItemClick('/dashboard')} />
<Navitem name="Package" onClick={() => handleItemClick('/superadmin/package')} />
      <Navitem name="Company" onClick={() => handleItemClick('/superadmin/company')} />
      <Navitem name="Super Admin">
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
      <Navitem name="Support Ticket">
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
      <Navitem name="Settings" />
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
