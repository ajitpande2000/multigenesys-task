import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    Dialog, DialogContent, DialogActions, Button,
    TextField, MenuItem, FormControl, InputLabel, Select,
    CircularProgress, Typography, FormHelperText,
    Box, IconButton, Fade, AppBar
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { getCountries } from '../../redux/store/slices/countriesSlice';

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 20,
        width: 480,
        maxWidth: '90vw',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(20px)',

    },
    '& .MuiDialog-container': {
        alignItems: 'flex-start',
        paddingTop: '20px'
    },
}));
const StyledDialogContent = styled(DialogContent)({
    p: '32px 32px 24px !important',
    pt: 0,


    maxHeight: '60vh',
    overflowY: 'auto',

    '&::-webkit-scrollbar': {
        width: '2px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#ff416c',
        borderRadius: '2px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#ff4b2b',
    },
    scrollbarWidth: 'thin',
    scrollbarColor: '#ff416c rgba(255,255,255,0.1)',
});

const StickyAppBar = styled(AppBar)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    zIndex: theme.zIndex.modal + 1,
    borderRadius: '20px 20px 0 0'
}));

const StyledDialogTitle = styled(Box)({
    padding: '20px 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: 12,
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        '&:hover': {
            borderColor: 'rgba(0,0,0,0.12)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.11)'
        },
        '&.Mui-focused': {
            borderColor: theme.palette.primary.main,
            boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`
        },
        '& fieldset': {
            border: 'none'
        }
    }
}));

const StyledSelect = styled(Select)({
    borderRadius: 12,
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(10px)',
    '&:focus': {
        borderRadius: 12,
        background: 'rgba(255,255,255,1)'
    }
});

export const AddEditEmployee = ({
    open,
    onClose,
    selectedEmployee,
    handleAddEdit
}) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.employee);
    const { loading: loadingCountries, countriesList } = useSelector((state) => state.country);
    const isEditMode = Boolean(selectedEmployee);
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            countryId: '',
            ...(selectedEmployee || {})
        },
        mode: 'onChange'
    });

    useEffect(() => {
        dispatch(getCountries({}));
    }, [dispatch]);

    useEffect(() => {
        if (isEditMode && selectedEmployee) {
            Object.entries(selectedEmployee).forEach(([key, value]) => {
                setValue(key, value);
            });
        } else {
            reset();
        }
    }, [selectedEmployee, isEditMode, reset, setValue]);

    useEffect(() => {
        if (!open) reset();
    }, [open, reset]);

    const onSubmit = (data) => {
        const selectedCountry = countriesList?.find((c) => c.id === data.countryId);
        handleAddEdit({
            ...(isEditMode && { id: selectedEmployee?.id }),
            ...data,
            country: selectedCountry?.country
        });
        onClose();
    };

    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
            scroll="paper"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
        >
            <StickyAppBar position="static" color="default" elevation={0}>
                <StyledDialogTitle>
                    <Typography variant="h6" fontWeight={600} color="text.primary">
                        {isEditMode ? 'Edit Employee' : 'Add New Employee'}
                    </Typography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            color: 'text.secondary',
                            '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                        }}
                        size="small"
                    >
                        <Close />
                    </IconButton>
                </StyledDialogTitle>
            </StickyAppBar>

            <form onSubmit={handleSubmit(onSubmit)}>
                <StyledDialogContent sx={{ p: '32px 32px 24px !important', pt: 0 }}>
                    <Box mb={3}>
                        <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: '0.85rem' }}>
                            Full Name *
                        </Typography>
                        <StyledTextField
                            fullWidth
                            {...register('name', {
                                required: 'Name is required',
                                minLength: { value: 2, message: 'Minimum 2 characters' }
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            placeholder="Enter full name"
                        />
                    </Box>
                    <Box mb={3}>
                        <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: '0.85rem' }}>
                            Email *
                        </Typography>
                        <StyledTextField
                            fullWidth
                            type="email"
                            {...register('emailId', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            error={!!errors.emailId}
                            helperText={errors.emailId?.message}
                            placeholder="yourname@example.com"
                        />
                    </Box>
                    <Box mb={3} display="flex" gap={3}>
                        <Box flex={1}>
                            <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: '0.85rem' }}>
                                Mobile *
                            </Typography>
                            <StyledTextField
                                fullWidth
                                {...register('mobile', {
                                    required: 'Mobile is required',
                                    pattern: { value: /^[0-9]{10}$/, message: '10 digit mobile required' }
                                })}
                                error={!!errors.mobile}
                                helperText={errors.mobile?.message}
                                placeholder="9876543210"
                            />
                        </Box>

                        <Box flex={1}>
                            <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: '0.85rem' }}>
                                Country *
                            </Typography>
                            <Controller
                                name="countryId"
                                control={control}
                                rules={{ required: 'Country is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <FormControl fullWidth error={!!error} variant="outlined">
                                        <StyledSelect
                                            sx={{ height: 56 }}
                                            {...field}
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>
                                                Country
                                            </MenuItem>
                                            {loadingCountries ? (
                                                <MenuItem disabled>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <CircularProgress size={20} />
                                                    </Box>
                                                </MenuItem>
                                            ) : (
                                                countriesList?.map((item) => (
                                                    <MenuItem key={item.id} value={item.id}>
                                                        {item.country}
                                                    </MenuItem>
                                                ))
                                            )}
                                        </StyledSelect>
                                        <FormHelperText sx={{ mt: 0.5 }}>
                                            {error?.message}
                                        </FormHelperText>
                                    </FormControl>
                                )}
                            />
                        </Box>
                    </Box>
                    <Box mb={3}>
                        <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: '0.85rem' }}>
                            State *
                        </Typography>
                        <StyledTextField
                            fullWidth
                            {...register('state', { required: 'State is required' })}
                            error={!!errors.state}
                            helperText={errors.state?.message}
                            placeholder="Enter state"
                        />
                    </Box>
                    <Box mb={4}>
                        <Typography variant="body2" color="text.secondary" mb={1} sx={{ fontSize: '0.85rem' }}>
                            District *
                        </Typography>
                        <StyledTextField
                            fullWidth
                            {...register('district', { required: 'District is required' })}
                            error={!!errors.district}
                            helperText={errors.district?.message}
                            placeholder="Enter district"
                            multiline
                            maxRows={3}
                        />
                    </Box>
                </StyledDialogContent>

                <DialogActions sx={{ px: 4, pb: 4, pt: 0 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loading}
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
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                    >
                        {loading ? 'Saving...' : (isEditMode ? 'Update Employee' : 'Create Employee')}
                    </Button>
                </DialogActions>
            </form>
        </StyledDialog >
    );
};
