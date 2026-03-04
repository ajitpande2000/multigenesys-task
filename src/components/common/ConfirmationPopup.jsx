import React from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Stack,
    Box,
    IconButton,
    Fade,

} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
    Close,
    Warning as WarningIcon
} from "@mui/icons-material";
const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: 20,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        border: '1px solid rgba(255,255,255,0.2)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(255,255,255,0.95)',
        maxWidth: 420
    }
}));

const StickyAppBar = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 0,
    background: 'rgba(255,255,255,0.98)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    zIndex: 1301,
    borderRadius: '20px 20px 0 0',
    padding: '20px 28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));

const WarningBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    border: '1px solid rgba(245,158,11,0.3)',
    borderRadius: 12,
    padding: '20px 24px',
    mt: 2,
    mb: 4
}));

export const ConfirmationPopup = ({
    open,
    title,
    message,
    onConfirm,
    onCancel,
}) => {
    return (
        <StyledDialog
            open={open}
            onClose={onCancel}
            maxWidth="xs"
            fullWidth
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 300 }}
        >
            <StickyAppBar>
                <Box display="flex" alignItems="center" gap={2}>
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(239,68,68,0.4)'
                        }}
                    >
                        <WarningIcon sx={{ color: 'white', fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight={700} color="text.primary" lineHeight={1.3}>
                            {title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                            Please confirm your action
                        </Typography>
                    </Box>
                </Box>
                <IconButton
                    onClick={onCancel}
                    sx={{
                        color: 'text.secondary',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                    }}
                    size="small"
                >
                    <Close />
                </IconButton>
            </StickyAppBar>

            <DialogContent sx={{ p: '0 28px 24px !important' }}>
                <WarningBox>
                    <Box
                        sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            background: 'rgba(239,68,68,0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <WarningIcon sx={{ color: '#f59e0b', fontSize: 28 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body1" fontWeight={600} color="text.primary" mb={0.5}>
                            Are you absolutely sure?
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                            {message || `This action cannot be undone. This will permanently delete the employee data and remove it from our system.`}
                        </Typography>
                    </Box>
                </WarningBox>
            </DialogContent>

            <DialogActions sx={{ px: 4, pb: 4, pt: 0 }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        width: "100%",
                        justifyContent: "center",
                    }}
                >
                    <Button
                        onClick={onCancel}
                        variant="outlined"
                        fullWidth
                        sx={{
                            height: 50,
                            borderRadius: 12,
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            borderWidth: 2,
                            borderColor: 'rgba(0,0,0,0.12)',
                            color: 'text.primary',
                            '&:hover': {
                                borderWidth: 2,
                                bgcolor: 'rgba(0,0,0,0.04)',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        variant="contained"
                        fullWidth
                        sx={{
                            height: 50,
                            borderRadius: 12,
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            bgcolor: '#ef4444',
                            boxShadow: '0 8px 25px rgba(239,68,68,0.4)',
                            '&:hover': {
                                bgcolor: '#dc2626',
                                boxShadow: '0 12px 35px rgba(239,68,68,0.5)',
                                transform: 'translateY(-1px)'
                            }
                        }}
                    >
                        Delete Employee
                    </Button>
                </Stack>
            </DialogActions>
        </StyledDialog>
    );
};
