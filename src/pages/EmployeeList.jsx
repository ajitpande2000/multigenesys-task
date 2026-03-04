import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { addEmployee, deleteEmployee, getEmployeeList, updateEmployee } from '../redux/store/slices/employeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon } from '@mui/icons-material';
import {
  Button,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Grid,
  Container,
  Typography,
  Box,
  Pagination,
} from '@mui/material';
import { AddEditEmployee } from '../components/employee/AddEditEmployee';
import { ConfirmationPopup } from '../components/common/ConfirmationPopup';
import { EmployeeTable } from '../components/employee/EmployeeTable';
import { EmployeeCard } from '../components/common/EmployeeCard';
import { LoadingCard } from '../components/common/LoadingCard';
import { CommonToggle } from '../components/common/CommonToggle';
export const EmployeeList = () => {
  const dispatch = useDispatch();
  const { employeeList, loading } = useSelector((state) => state.employee);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [selected, setSelected] = useState('table');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cardPage, setCardPage] = useState(0);
  const [cardRowsPerPage, setCardRowsPerPage] = useState(12);
  useEffect(() => {
    dispatch(getEmployeeList({}))
  }, [])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleCardChangePage = (event, newPage) => {
    setCardPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

  };
  const handleDelete = () => {
    dispatch(deleteEmployee(selectedEmployee))
    setSelectedEmployee(null);
    setIsDeleteConfirm(false)
  }
  const handleAddEdit = (data) => {
    if (selectedEmployee) {
      dispatch(updateEmployee(data))
      setSelectedEmployee(null)
    } else {
      dispatch(addEmployee(data))
    }
  }
  const handleClose = () => {
    setIsOpenAddEditModal(false);
    setSelectedEmployee(null)
  }

  const filteredEmployeeList = useMemo(() => {
    if (!search.trim()) return employeeList;
    const searchLower = search?.toLowerCase().trim();
    return employeeList.filter((employee) =>
      employee?.id?.toString().toLowerCase().includes(searchLower));
  }, [employeeList, search]);

  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
    setPage(0)
    setCardPage(0);
  }, []);

  const paginatedCards = useMemo(() => {
    if (!filteredEmployeeList?.length) return [];
    return filteredEmployeeList.slice(
      cardPage * cardRowsPerPage,
      (cardPage + 1) * cardRowsPerPage
    );
  }, [filteredEmployeeList, cardPage, cardRowsPerPage]);

  const paginatedData = filteredEmployeeList?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ) || [];

  return (
    <>
      <Box className="employee-container" sx={{ width: '100vw', maxWidth: '100%' }}>
        <CommonToggle selected={selected} onToggle={(e, newValue) => setSelected(newValue)} />
        <Card
          sx={{
            borderRadius: '20px',
            width: '100%',
            mx: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <CardContent sx={{ px: { xs: 3, md: 4 }, py: 3 }}>
            <Grid
              container
              column={12}
              sx={{ marginBottom: '15px' }}
              justifyContent="space-between"
            >
              <Grid item xs={4} >
                <TextField
                  placeholder="Search employee by Id"
                  value={search}
                  onChange={handleSearchChange}
                  fullWidth
                  size="small"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0,0,0,0.23)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(0,0,0,0.23)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#ff416c !important',
                        borderWidth: 2,
                      }
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                xs={4}
                container
              >
                <Button
                  onClick={() => setIsOpenAddEditModal(true)}
                  fullWidth
                  variant="contained"
                  sx={{
                    height: 50,
                    borderRadius: 12,
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textTransform: 'none',
                    bgcolor: '#ff416c',
                    boxShadow: '0 8px 25px rgba(26,26,46,0.4)',
                    '&:hover': {
                      bgcolor: '#ff4b2b',
                      boxShadow: '0 12px 35px rgba(26,26,46,0.5)',
                      transform: 'translateY(-1px)'
                    },
                    '&:disabled': {
                      bgcolor: 'rgba(0,0,0,0.12)'
                    }
                  }}

                >
                  Add New Employee
                </Button>
              </Grid>
            </Grid>

            {selected === 'table' ?
              <EmployeeTable
                page={page}
                paginatedData={paginatedData}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                data={filteredEmployeeList}
                loading={loading}
                onDeleteAction={(row) => {
                  setIsDeleteConfirm(true);
                  setSelectedEmployee(row);
                }}
                onEditAction={(row) => {
                  setSelectedEmployee(row);
                  setIsOpenAddEditModal(true);

                }}
              /> :
              <Container maxWidth="lg" sx={{ py: 2 }}>
                <Box
                  sx={{
                    maxHeight: 600,
                    overflowY: 'auto',
                    pb: 3,
                    width: '100%',
                    maxWidth: '100%',
                    minWidth: 900,
                    '&::-webkit-scrollbar': {
                      width: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#ff416c',
                      borderRadius: '6px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: '#ff4b2b',
                    },
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#ff416c rgba(255,255,255,0.1)',
                  }}
                >
                  <Grid
                    container
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                    justifyContent="center"
                  >
                    {loading ? <>{
                      [1, 2, 3]?.map((item) => (
                        <Grid
                          key={item}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center'
                          }}
                        ><LoadingCard /></Grid>))
                    }</> :
                      paginatedCards?.length > 0 ?
                        paginatedCards?.map((emp, index) => (
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={emp?.id || index}
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-start'

                            }}
                          >
                            <EmployeeCard
                              employee={emp}
                              onEdit={(row) => {
                                setSelectedEmployee(row);
                                setIsOpenAddEditModal(true);
                              }}
                              onDelete={(row) => {
                                setIsDeleteConfirm(true);
                                setSelectedEmployee(row);
                              }}
                            /></Grid>)) :

                        <Typography sx={{ fontStyle: "italic", color: "gray" }}>
                          No one employee available.
                        </Typography>
                    }
                  </Grid>
                </Box>
                {filteredEmployeeList?.length > 0 && !loading && (
                  <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                    py: 2
                  }}>
                    <Pagination
                      count={Math.ceil(filteredEmployeeList.length / cardRowsPerPage)}
                      page={cardPage + 1}
                      onChange={handleCardChangePage}
                      color="primary"
                      size="small"
                      sx={{
                        '& .MuiPaginationItem-root': {
                          color: '#ff416c',
                          fontWeight: 500
                        },
                        '& .MuiPaginationItem-selected': {
                          bgcolor: '#ff416c',
                          color: 'white',
                          borderRadius: '8px'
                        }
                      }}
                    />
                    <Box sx={{ ml: 2, alignSelf: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
                      {`Showing ${cardPage * cardRowsPerPage + 1}-${Math.min((cardPage + 1) * cardRowsPerPage, filteredEmployeeList.length)} of ${filteredEmployeeList.length}`}
                    </Box>
                  </Box>
                )}
              </Container >}
          </CardContent>
        </Card>


        {isOpenAddEditModal &&
          <AddEditEmployee
            selectedEmployee={selectedEmployee}
            handleAddEdit={handleAddEdit}
            open={isOpenAddEditModal}
            onClose={handleClose}
          />
        }
        {isDeleteConfirm &&
          <ConfirmationPopup
            title='Confirmation'
            message={`Are you sure you want to delete ${selectedEmployee?.name || ''}  user data?`}
            open={isDeleteConfirm}
            onCancel={() => {
              setIsDeleteConfirm(false);
              setSelectedEmployee(null);
            }}
            onConfirm={handleDelete}
          />
        }
      </Box>
    </>
  )
}

