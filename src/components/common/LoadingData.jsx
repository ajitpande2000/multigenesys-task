import React from "react";
import {
    TableCell,
    TableRow,
    Skeleton,
    Stack
} from "@mui/material";

export const LoadingData = ({
    columnLength = 6,
    rows = 3,
}) => {
    return (
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: columnLength }).map((_, colIndex) => (
                        <TableCell key={colIndex}>
                            {colIndex === 1 ? (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Skeleton
                                        variant="circular"
                                        width={36}
                                        height={36}
                                        animation="wave"
                                    />
                                    <Skeleton
                                        variant="text"
                                        width="70%"
                                        animation="wave"
                                    />
                                </Stack>
                            ) : (
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    height={24}
                                    width="90%"
                                />
                            )}

                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};