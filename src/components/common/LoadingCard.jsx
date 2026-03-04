import React from 'react';
import {
    Box, Card, Stack, Divider, Skeleton
} from '@mui/material';

import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 320,
    height: 580,
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

export const LoadingCard = () => {
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
                    <Skeleton variant="circular" width={96} height={96} sx={{ border: '6px solid white', mx: 'auto' }} />
                </Box>
                <Box sx={{ textAlign: 'center', mt: 7, mb: 3 }}>
                    <Skeleton variant="text" sx={{ fontSize: '2.125rem', fontWeight: 'bold', mx: 'auto', width: '60%' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1.25rem', mx: 'auto', width: '80%' }} />
                </Box>
                <Skeleton variant="rounded" sx={{ height: 40, borderRadius: 2, mb: 3 }} />
                <Box sx={{ mb: 3 }}>
                    <Stack spacing={1.5}>
                        <SkeletonContactItem />
                        <SkeletonContactItem />
                        <SkeletonContactItem />
                    </Stack>
                </Box>
                <Divider sx={{ my: 2, borderColor: 'rgba(0,0,0,0.1)' }} />
                <Stack direction="row" spacing={1}>
                    <Skeleton variant="rounded" sx={{ height: 32, borderRadius: 2, flex: 1 }} />
                    <Skeleton variant="rounded" sx={{ height: 32, borderRadius: 2, flex: 1 }} />
                </Stack>
            </Box>
        </StyledCard>
    );
}
const SkeletonContactItem = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" sx={{ fontSize: '0.85rem', width: '80%' }} />
    </Box>
);
