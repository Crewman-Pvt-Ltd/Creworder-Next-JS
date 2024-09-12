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
import useGetAllDepartments from '@/api-manage/react-query/useGetAllDepartments';
import { useRouter } from "next/router";
const DepartmentList = ({ onAddDepartment }) => {
  const { data, refetch, isLoading, isError } = useGetAllDepartments();
  const router = useRouter();

  const handleEdit = (row) => {
    router.push(`/hr/department/editdepartment?id=${row.id}`);
  };

  const handleDeleteClick = (id) => {
    console.log('Delete', id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading departments</div>;

  return (
    <Grid container spacing={2} sx={{ padding: 3 }}>
      <Grid item xs={12} sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={onAddDepartment}
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
          Add Department
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
      <Grid item xs={12} sm={12} md={12}>
        <CustomCard>
          <CardContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Parent Department</TableCell>
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
                        {row.department}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleEdit(row)}
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

export default DepartmentList;
