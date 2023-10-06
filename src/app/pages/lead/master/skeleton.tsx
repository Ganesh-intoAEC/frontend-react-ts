import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function SkeletonMasterGrid() {
  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead 
        sx={{
          backgroundColor: "#3CA2FF",
          "&:MuiTableCell-head": { color: "#FFFFFF" },
        }}>
          <TableRow
          sx={{
            "& .MuiTableCell-root": {
              color: "#ffffff",
            },
          }}>
            <TableCell><Skeleton
                  className="mr-2"
                  variant="rounded"
                  width={'70%'}
                  height={30}
                /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /> </TableCell>
            <TableCell align="right"> <Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /> </TableCell>
            <TableCell align="right"> <Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow>
            <TableCell> </TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /> </TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"> <Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
          </TableRow>
          <TableRow>
            <TableCell> </TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"> </TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /></TableCell>
            <TableCell align="right"><Skeleton variant="rectangular" width={'70%'} height={20} /> </TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
     
    </div>
  );
}
