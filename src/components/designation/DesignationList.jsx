import React from 'react';
import {
  Grid,
  Button,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import CustomCard from '../CustomCard';
import useGetAllDesignations from '@/api-manage/react-query/useGetAllDesignations';

const DesignationList = ({ onAddDesignation }) => {
  const { data, refetch, isLoading, isError } = useGetAllDesignations();

  const handleEdit = (id) => {
    console.log('Edit', id);
  };

  const handleDeleteClick = (id) => {
    console.log('Delete', id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading Designations</div>;

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={onAddDesignation}
          sx={{
            padding: '8px 16px',
            fontSize: '14px',
            backgroundColor: '#405189',
            color: 'white',
            '&:hover': {
              backgroundColor: '#334a6c',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Add Designation
        </Button>
        <Button
          sx={{
            padding: '8px 16px',
            fontSize: '14px',
            border: '2px solid #405189',
            color: '#405189',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: '#f0f0f0',
            },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textTransform: 'none',
          }}
        >
          <AddIcon sx={{ fontSize: 20 }} />
          Export
        </Button>
      </Grid>
      <Grid item xs={12}>
        <CustomCard>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Parent Designation</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.results.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        sx={{ maxWidth: '300px', overflowWrap: 'anywhere' }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{ maxWidth: '300px', overflowWrap: 'anywhere' }}
                      >
                        {row.Designation}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(row.id)}
                          aria-label="edit"
                          sx={{ color: 'green' }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(row.id)}
                          aria-label="delete"
                          sx={{ color: 'red' }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CustomCard>
      </Grid>
    </Grid>
  );
};

export default DesignationList;
