import React from 'react'

import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    Avatar,
    Box,
    Typography,
    TablePagination,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { LoadingData } from '../common/LoadingData';
import { NoDataAvailable } from '../common/NoDataAvailable';


export const EmployeeTable = ({ loading, data, page, onDeleteAction, paginatedData, onEditAction, handleChangeRowsPerPage, handleChangePage, rowsPerPage }) => {
    return (
        <Box >
            <TableContainer component={Paper}
                sx={{
                    // width: '100%',
                    // maxWidth: '100%',
                    // minWidth: 900,
                    maxHeight: '650px',
                }}>
                <Table aria-label="employee table"
                    sx={{
                        tableLayout: 'fixed',
                        minWidth: 900
                    }} >
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#ff416c', borderTopLeftRadius: 16, }} className='table-header' align="left">#</TableCell>
                            <TableCell sx={{ backgroundColor: '#ff416c', }} className='table-header' align="left">Name</TableCell>
                            <TableCell sx={{ backgroundColor: '#ff416c', }} className='table-header' align="left">Email</TableCell>
                            <TableCell sx={{ backgroundColor: '#ff416c', }} className='table-header' align="left">Mobile</TableCell>
                            <TableCell sx={{ backgroundColor: '#ff416c', }} className='table-header' align="left">  Country</TableCell>
                            <TableCell sx={{ backgroundColor: '#ff416c', borderTopRightRadius: 16 }} className='table-header' align="right"> Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <LoadingData columnLength={6} rows={5} />)
                            : paginatedData?.length > 0 ? (
                                paginatedData.map((row, index) => (
                                    <TableRow
                                        key={`${row.id}${index}`}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.id ?? ''}</TableCell>
                                        <TableCell
                                            className='table-text-overlap'
                                            sx={{
                                                fontSize: '0.8rem'
                                            }} component="th" scope="row">
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.75,
                                                minWidth: 0
                                            }}>
                                                <Avatar
                                                    alt={row.name || ""}
                                                    src={row.avatar}
                                                    sx={{ width: 28, height: 28, fontSize: '0.75rem' }}
                                                />
                                                <Typography
                                                    noWrap
                                                    sx={{
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        fontSize: 'inherit'
                                                    }}
                                                >
                                                    {row.name ?? ''}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell className='table-text-overlap' align="left">{row.emailId ?? ''}</TableCell>
                                        <TableCell align="left">{row.mobile ?? ''}</TableCell>
                                        <TableCell sx={{ fontSize: '0.8rem' }} align="left">{row.country ?? ''}</TableCell>
                                        <TableCell align="right" sx={{ py: 1 }}>
                                            <IconButton
                                                data-testid="edit-btn"
                                                size="small"
                                                onClick={() => { onEditAction(row) }}
                                                sx={{ mr: 1 }}
                                            >
                                                <EditIcon fontSize="small" color="primary" />
                                            </IconButton>
                                            <IconButton
                                                data-testid="delete-btn"
                                                size="small"
                                                onClick={() => { onDeleteAction(row) }}
                                                sx={{ color: 'error.main' }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <NoDataAvailable message={"No one employee available"} columnLength={5} />
                            )}
                    </TableBody>
                </Table>
            </TableContainer >
            {!loading && data?.length > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <TablePagination
                        component="div"
                        count={data?.length || 0}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        labelRowsPerPage="Rows per page:"
                        labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                        sx={{
                            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                                ml: 2
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

