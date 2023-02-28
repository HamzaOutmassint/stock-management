import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { NavLink } from "react-router-dom";

function createData(name, calories, fat, carbs, See_detail) {
  return {
    name,
    calories,
    fat,
    carbs,
    See_detail,
  };
}

const rows = [
  createData("hamza outmassint", "EE12450", "0602314804", "Electricity", "see more details"),
  createData("salah elfatimi", "EE11615", "0625451554", "Plumbing", "see more details"),
  createData("walid katir", "EE45871", "0615489562", "Ventilation", "see more details"),
  createData("hicham radi", "EE15021", "0653127586", "Air conditioner", "see more details"),
  createData("youssef radi", "EE65487", "0612658745", "Plumbing", "see more details"),
  createData("khalid bouskso", "EE21547", "0612457812", "Air conditioner", "see more details"),
  createData("norddin amezwar", "EE13254", "0698547826", "Ventilation", "see more details"),
  createData("samir mglawi", "EE14875", "0612325487", "Plumbing", "see more details"),
  createData("imran sdjhds", "EE95847", "0645789512", "Electricity", "see more details"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Full Name",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Identity Card Number",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "Specialty",
  },
  {
    id: "See_detail",
    numeric: true,
    disablePadding: false,
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className="bg-[#3C3D42]">
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              style={
                headCell.label === "Full Name" ? {"paddingLeft":"33px","fontWeight":600,"color":"#fff"} 
                : headCell.label === 'Number_of_Persons' ? {"paddingRight":"33px","fontWeight":600,"color":"#fff"} : {"fontWeight":600,"color":"#fff"}
              }
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AdminTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} style={{"borderRadius":"10px", "backgroundColor":"#1F2025"}} >
        <TableContainer >
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody >
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell component="th" id={labelId} scope="row" style={{ paddingLeft: "33px","color":"#fff"}}>{row.name}</TableCell>
                      <TableCell align="center" style={{"color":"#fff"}}> {row.calories}</TableCell>
                      <TableCell align="center" style={{"color":"#fff"}}> {row.fat}</TableCell>
                      <TableCell align="center" style={{"color":"#fff"}}> {row.carbs}</TableCell>
                      <TableCell align="right" style={{ paddingRight: "45px","color":"#fff"}}>
                        <NavLink to={"../DetailsController"} className="hover:underline decoration-solid hover:text-[#3471ff]">{row.See_detail}</NavLink>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
        style={{"color":"#fff"}}
          rowsPerPageOptions={[5, 8]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}