import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: 5,
    marginRight: 5,
    overflowX: 'auto',
  },
  table: {
    width: '100%',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, value) {
  id += 1;
  return { id, name, value };
}

const getRows = (data) => [
  createData('Drm Name', data.drmName),
  createData('Drm Security', data.drmSecurity),
  createData('Supported HDCP level', data.hdcpLevel),
  createData('Persistent state enabled (can be used for tracking purposes)', data.drmCanPersistState),
];

function CustomizedTable(props) {
  const { classes } = props;
  const rows = getRows(props);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Property</CustomTableCell>
            <CustomTableCell>Value</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow className={classes.row} key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell >{row.value || '...'}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  drmName: PropTypes.string,
  drmSecurity: PropTypes.string,
  drmCanPersistState: PropTypes.string,
  hdcpLevel: PropTypes.string,
};

export default withStyles(styles)(CustomizedTable);