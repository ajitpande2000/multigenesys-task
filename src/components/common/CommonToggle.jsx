import React from 'react'
import {
    Typography,
    ToggleButton,
    ToggleButtonGroup,
    Box,
} from '@mui/material';
import { TableView, Dashboard } from '@mui/icons-material';

export const CommonToggle = ({ onToggle, selected }) => {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <ToggleButtonGroup
                value={selected}
                exclusive
                onChange={onToggle}
                orientation="horizontal"
                sx={{
                    marginBottom: '4px',
                    borderRadius: 24,
                    background: 'rgba(255,255,255,0.8)',
                    backdropFilter: 'blur(20px)',
                    overflow: 'visible',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                    '& .MuiToggleButton-root': {
                        borderRadius: 24,
                        border: 'none !important',
                        padding: '12px 24px',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        textTransform: 'none',
                        position: 'relative',
                        gap: '8px',
                        transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1,
                        color: '#1a1a1a',
                        '&:hover': {
                            bgcolor: 'rgba(255,65,108,0.1)',
                            color: '#ff416c'
                        },
                        '&.Mui-selected': {
                            bgcolor: 'linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%) !important',
                            color: '#1a1a1a !important',
                            boxShadow: '0 8px 25px rgba(255,65,108,0.6) !important',
                            zIndex: 3,
                            transform: 'translateZ(0)',
                            '& *': {
                                color: 'inherit !important'
                            },
                            '& .MuiSvgIcon-root': {
                                color: '#1a1a1a !important'
                            }
                        },
                        '&.Mui-focusVisible': {
                            boxShadow: `0 0 0 3px rgba(255,65,108,0.3) !important`,
                            bgcolor: 'rgba(255,65,108,0.15)',
                            color: '#ff416c'
                        }
                    }
                }}
            >
                <ToggleButton value="table" sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                    <TableView />
                    <Typography variant="body2">Table</Typography>
                </ToggleButton>
                <ToggleButton value="card" sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                    <Dashboard />
                    <Typography variant="body2">Card</Typography>
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    )
}

