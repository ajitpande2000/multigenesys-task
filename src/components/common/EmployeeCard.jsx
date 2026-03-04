
import React from 'react';
import {
    Box, Card, Avatar, Typography, Button, Stack, Divider
} from '@mui/material';
import { Edit, Delete, Phone, Mail, Public } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 320,
    height: 540,
    borderRadius: 24,
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)',
        borderRadius: '24px 24px 0 0'
    }
}));

export const EmployeeCard = ({
    employee,
    onEdit,
    onDelete,
}) => {
    const {
        name,
        avatar,
        id,
        emailId,
        mobile,
        country,
    } = employee || {};

    return (
        <StyledCard>
            <Box sx={{ position: 'relative', height: 120 }} />
            <Box sx={{ px: 4, pt: 3, pb: 2 }}>
                <Box sx={{
                    position: 'absolute',
                    top: 64,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2
                }}>
                    <Avatar
                        src={avatar}
                        sx={{
                            width: 96,
                            height: 96,
                            border: '6px solid white',
                            boxShadow: '0 16px 32px rgba(0,0,0,0.3)'
                        }}
                    >
                        {name.charAt(0).toUpperCase()}
                    </Avatar>
                </Box>
                <Box sx={{ textAlign: 'center', mt: 7, mb: 3 }}>
                    <Typography noWrap variant="h6" fontWeight={800} sx={{ mb: 0.5, lineHeight: 1.1 }}>
                        {name}
                    </Typography>
                </Box>
                <Box
                    fullWidth
                    variant="contained"
                    sx={{
                        textAlign: 'center',
                        borderRadius: 2,
                        py: 1.2,
                        fontWeight: 600,
                        textTransform: 'none',
                        bgcolor: '#ff416c',
                        '&:hover': { bgcolor: '#ff4b2b' },
                        mb: 3
                    }}
                >
                    {`ID: ${id}`}
                </Box>
                <Box sx={{ mb: 3 }}>
                    <Stack spacing={1.5}>
                        <ContactItem icon={<Mail />} label="Email" value={emailId} />
                        <ContactItem icon={<Phone />} label="Mobile" value={mobile} />
                        <ContactItem icon={<Public />} label="Country" value={country} />
                    </Stack>
                </Box>


                <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                <Stack direction="row" spacing={1}>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<Edit />}
                        onClick={() => onEdit?.(employee)}
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            py: 0.75
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        variant="contained"
                        startIcon={<Delete />}
                        onClick={() => onDelete?.(employee)}
                        sx={{
                            flex: 1,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontWeight: 500,
                            bgcolor: '#ff416c',
                            '&:hover': { bgcolor: '#ff4b2b' },
                            py: 0.75
                        }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>
        </StyledCard>
    );
};


const ContactItem = ({ icon, value }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{
            width: 32,
            height: 32,
            borderRadius: 1,
            bgcolor: 'rgba(255,65,108,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {icon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="body2" fontWeight={500} noWrap sx={{ fontSize: '0.85rem' }}>
                {value}
            </Typography>
        </Box>
    </Box>
);
