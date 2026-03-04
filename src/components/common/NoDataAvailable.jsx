import React from 'react'
import { TableCell, Typography ,TableRow} from '@mui/material';
export const NoDataAvailable = ({
  message = "No data to display",
  columnLength = 9,
}) => {
 
  return (
    <TableRow>
      <TableCell colSpan={columnLength} align="center" sx={{ py: 5 }}>
        <Typography sx={{ fontStyle: "italic", color: "gray" }}>
          {message}
        </Typography>
      </TableCell>
    </TableRow>
  );
};